/**
 * Gera a base de conhecimento vetorial.
 *
 * Combina duas fontes:
 *   1. Os chunks curados em app/lib/knowledge.ts (perfil, site e currículo).
 *   2. O texto bruto extraído dos PDFs de currículo em public/, dividido em
 *      trechos, para dar recall a detalhes que não estão curados.
 *
 * Escreve data/embeddings.json, que a API lê em runtime. Rodar localmente:
 *   npm run rag:index
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractText, getDocumentProxy } from "unpdf";
import { KNOWLEDGE } from "../app/lib/knowledge.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(OUT_DIR, "embeddings.json");

// O Node puro não lê .env.local, então replicamos o comportamento do Next.js.
for (const envFile of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(path.join(ROOT, envFile));
  } catch {
    // Ausente ou sem permissões: seguimos com o ambiente atual.
  }
}

const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ??
  "https://generativelanguage.googleapis.com/v1beta";
const EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

/** Truncamento via MRL: 3072 dimensões × 25 trechos deixa o índice pesado. */
const EMBEDDING_DIMENSIONS = 768;

/**
 * Currículos em public/ que entram no índice.
 *
 * Só o canônico é usado por padrão: os outros PDFs do public/ repetem quase
 * todo o conteúdo em outra ordem, e trechos duplicados competem entre si na
 * busca e puxam metade do contexto para o mesmo assunto. Adicione outros
 * nomes aqui se quiser dar recall a alguma informação que ficou de fora.
 */
const RESUMES = ["Curriculo_atualizado2026.pdf"];

const CHUNK_TARGET_CHARS = 1400;
const CHUNK_OVERLAP_CHARS = 200;
const EMBED_BATCH_SIZE = 64;

/**
 * Precisão dos vetores guardados em disco. Quatro casas decimais deixam a
 * similaridade de cosseno com erro da ordem de 1e-4, muito abaixo do que
 * interfere no ranking, e cortam o arquivo pela metade.
 */
const VECTOR_PRECISION = 10 ** -4;

/* ------------------------------------------------------------------ */
/* Extração e fatiamento dos currículos                                */
/* ------------------------------------------------------------------ */

/** Os chunks curados vêm do mesmo módulo que a aplicação usa em runtime. */
function loadCuratedChunks() {
  if (KNOWLEDGE.length === 0) {
    throw new Error("KNOWLEDGE está vazio em app/lib/knowledge.ts.");
  }
  return KNOWLEDGE.map((chunk) => ({ ...chunk, origin: "curated" }));
}

async function extractPdfText(fileName) {
  const filePath = path.join(ROOT, "public", fileName);
  const buffer = new Uint8Array(await readFile(filePath));
  const document = await getDocumentProxy(buffer);
  const { text } = await extractText(document, { mergePages: true });
  return text;
}

/** Normaliza o texto extraído de PDF: remove hifenização e linhas soltas. */
function normalizeText(raw) {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(\w)-\n(\w)/g, "$1$2")
    .trim();
}

/**
 * Os PDFs do currículo são layouts de duas colunas, então a ordem de leitura
 * do texto extraído se mistura (títulos aparecem no fim, Experience no meio).
 * Agrupar por sentenças completas e manter sobreposição reduz o corte de
 * ideias pela metade.
 */
function chunkText(text, baseId, sourceTitle) {
  const sentences = text
    .split(/(?<=[.!?;:])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const chunks = [];
  let current = "";

  const flush = () => {
    const content = current.trim();
    if (content.length < 120) return;
    chunks.push({
      id: `${baseId}-${chunks.length + 1}`,
      category: "experiencia",
      title: sourceTitle,
      content,
      origin: "resume",
    });
    // Sobrepõe o fim do trecho para não perder frases na fronteira.
    const tail = content.slice(-CHUNK_OVERLAP_CHARS);
    const lastBoundary = tail.search(/[.!?;]/);
    current = lastBoundary === -1 ? tail : tail.slice(lastBoundary + 1);
  };

  for (const sentence of sentences) {
    if (current.length + sentence.length + 1 > CHUNK_TARGET_CHARS && current) {
      flush();
    }
    current += (current ? " " : "") + sentence;
  }
  flush();

  return chunks;
}

/* ------------------------------------------------------------------ */
/* Embeddings                                                           */
/* ------------------------------------------------------------------ */

function resolveApiKey() {
  const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!key) {
    throw new Error(
      "Defina GEMINI_API_KEY no .env.local. Crie uma chave gratuita em https://aistudio.google.com/apikey",
    );
  }
  return key;
}

async function embedBatch(values) {
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/${EMBEDDING_MODEL}:batchEmbedContents`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": resolveApiKey(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: values.map((text) => ({
          model: `models/${EMBEDDING_MODEL}`,
          content: { parts: [{ text }] },
          outputDimensionality: EMBEDDING_DIMENSIONS,
        })),
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Gemini ${response.status} /batchEmbedContents: ${detail.slice(0, 400)}`,
    );
  }

  const payload = await response.json();
  if (!Array.isArray(payload.embeddings)) {
    throw new Error("Resposta inesperada de /batchEmbedContents.");
  }

  return payload.embeddings.map((item) => item.values);
}

/** Texto enviado ao modelo de embedding: título repetido pesa mais na busca. */
function toEmbeddingInput(chunk) {
  const header = `${chunk.title}\n${chunk.category}`;
  return `${header}\n\n${chunk.content}`;
}

/* ------------------------------------------------------------------ */
/* Main                                                                 */
/* ------------------------------------------------------------------ */

async function main() {
  console.log("→ Lendo chunks curados de app/lib/knowledge.ts");
  const curated = loadCuratedChunks();
  console.log(`  ${curated.length} chunks curados`);

  const resumeChunks = [];

  for (const fileName of RESUMES) {
    try {
      const raw = await extractPdfText(fileName);
      const text = normalizeText(raw);
      const baseId = `cv-${path.basename(fileName, ".pdf").toLowerCase()}`;
      const chunks = chunkText(text, baseId, `Currículo: ${fileName}`);
      resumeChunks.push(...chunks);
      console.log(
        `  ${fileName}: ${text.length} caracteres → ${chunks.length} trechos`,
      );
    } catch (error) {
      console.warn(`  ! ${fileName} ignorado: ${error.message}`);
    }
  }

  const all = [...curated, ...resumeChunks];
  const unique = all.filter(
    (chunk, index) =>
      all.findIndex((c) => c.content.trim() === chunk.content.trim()) === index,
  );

  console.log(
    `→ Total: ${unique.length} trechos (${
      unique.length - curated.length
    } vindo dos currículos)`,
  );

  console.log(`→ Gerando embeddings com ${EMBEDDING_MODEL}`);

  const inputs = unique.map(toEmbeddingInput);
  const vectors = [];

  for (let i = 0; i < inputs.length; i += EMBED_BATCH_SIZE) {
    const batch = inputs.slice(i, i + EMBED_BATCH_SIZE);
    vectors.push(...(await embedBatch(batch)));
    const done = Math.min(i + EMBED_BATCH_SIZE, inputs.length);
    process.stdout.write(`  ${done}/${inputs.length}\r`);
  }

  const dimensions = vectors[0]?.length;
  if (!dimensions) {
    throw new Error("Nenhum embedding foi gerado.");
  }

  const mismatched = vectors.findIndex((v) => v.length !== dimensions);
  if (mismatched !== -1) {
    throw new Error(
      `Embeddings com dimensões inconsistentes no índice ${mismatched}.`,
    );
  }

  const entries = unique.map((chunk, i) => ({
    id: chunk.id,
    category: chunk.category,
    title: chunk.title,
    content: chunk.content,
    url: chunk.url,
    anchor: chunk.anchor,
    embedding: vectors[i].map((value) => Math.round(value / VECTOR_PRECISION) * VECTOR_PRECISION),
  }));

  const store = {
    model: EMBEDDING_MODEL,
    dimensions,
    generatedAt: new Date().toISOString(),
    entries,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify(store)}\n`, "utf8");

  console.log(`\n✓ ${entries.length} trechos indexados → data/embeddings.json`);
  console.log(`  modelo: ${EMBEDDING_MODEL} | dimensões: ${dimensions}`);
}

main().catch((error) => {
  console.error(`\n✗ Falha ao gerar o índice: ${error.message}`);
  process.exitCode = 1;
});
