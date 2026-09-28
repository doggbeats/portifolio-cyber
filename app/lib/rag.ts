import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { embedOne } from "./gateway";
import type { KnowledgeCategory } from "./knowledge";

export interface RetrievedChunk {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  url?: string;
  anchor?: string;
  score: number;
}

export interface StoreEntry {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  url?: string;
  anchor?: string;
  embedding: number[];
}

export interface VectorStore {
  model: string;
  dimensions: number;
  generatedAt: string;
  entries: StoreEntry[];
}

const STORE_PATH = path.join(process.cwd(), "data", "embeddings.json");

/** Quantos candidatos avaliamos antes de aplicar o corte por relevância. */
const CANDIDATE_POOL = 12;
/** Quantos trechos entram no prompt final. */
const DEFAULT_TOP_K = 5;
/**
 * Corte de relevância, calibrado com o gemini-embedding-001 neste corpus.
 * Perguntas dentro do escopo têm o melhor trecho entre 0.61 e 0.80; perguntas
 * fora do escopo ficam entre 0.48 e 0.52. Cortar em 0.58 separa os dois
 * grupos com folga e evita gastar uma geração com contexto irrelevante.
 */
const MIN_SCORE = 0.58;

let storePromise: Promise<VectorStore> | null = null;

/** Carrega o cache de embeddings uma única vez por instância do servidor. */
export function loadStore(): Promise<VectorStore> {
  storePromise ??= (async () => {
    const raw = await readFile(STORE_PATH, "utf8");
    const store = JSON.parse(raw) as VectorStore;

    if (!Array.isArray(store.entries) || store.entries.length === 0) {
      throw new Error(
        "data/embeddings.json está vazio. Rode `npm run rag:index` para gerar.",
      );
    }

    return store;
  })().catch((error) => {
    // Permite nova tentativa no próximo request em vez de cachear a falha.
    storePromise = null;
    throw error;
  });

  return storePromise;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Dimensões de embedding divergentes: ${a.length} vs ${b.length}. Regere o índice com "npm run rag:index".`,
    );
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * MMR (Maximal Marginal Relevance): prioriza relevância, mas penaliza
 * trechos parecidos entre si. Sem isso, cinco chunks sobre NOC dominariam o
 * contexto e o modelo nunca veria os projetos.
 */
function selectDiverse(
  candidates: ScoredCandidate[],
  topK: number,
  lambda = 0.72,
): ScoredCandidate[] {
  const selected: ScoredCandidate[] = [];
  const pool = [...candidates];

  while (selected.length < topK && pool.length > 0) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < pool.length; i++) {
      const candidate = pool[i];
      const redundancy = selected.length
        ? Math.max(
            ...selected.map((s) => cosineSimilarity(s.vector, candidate.vector)),
          )
        : 0;

      const mmr = lambda * candidate.score - (1 - lambda) * redundancy;
      if (mmr > bestScore) {
        bestScore = mmr;
        bestIndex = i;
      }
    }

    const [chosen] = pool.splice(bestIndex, 1);
    selected.push(chosen);
  }

  return selected;
}

export interface RetrieveOptions {
  topK?: number;
  minScore?: number;
}

export interface RetrieveResult {
  chunks: RetrievedChunk[];
  /** true quando nada na base ficou acima do corte de relevância. */
  empty: boolean;
  /** Similaridade do melhor candidato, mesmo quando o corte rejeita tudo. */
  bestScore: number;
}

/** Candidato intermediário: mantém o vetor para o cálculo de MMR. */
interface ScoredCandidate extends RetrievedChunk {
  vector: number[];
}

/** Recupera os trechos mais relevantes para uma pergunta. */
export async function retrieve(
  question: string,
  { topK = DEFAULT_TOP_K, minScore = MIN_SCORE }: RetrieveOptions = {},
): Promise<RetrieveResult> {
  const store = await loadStore();
  const queryVector = await embedOne(question);

  if (queryVector.length !== store.dimensions) {
    throw new Error(
      `O modelo de embedding mudou (${queryVector.length} dimensões, índice tem ${store.dimensions}). Rode \`npm run rag:index\`.`,
    );
  }

  const scored: ScoredCandidate[] = store.entries
    .map((entry) => ({
      id: entry.id,
      category: entry.category,
      title: entry.title,
      content: entry.content,
      url: entry.url,
      anchor: entry.anchor,
      score: cosineSimilarity(queryVector, entry.embedding),
      vector: entry.embedding,
    }))
    .sort((a, b) => b.score - a.score);

  const bestScore = scored[0]?.score ?? 0;
  const relevant = scored
    .filter((item) => item.score >= minScore)
    .slice(0, CANDIDATE_POOL);

  const chunks: RetrievedChunk[] = selectDiverse(relevant, topK).map(
    (candidate) => ({
      id: candidate.id,
      category: candidate.category,
      title: candidate.title,
      content: candidate.content,
      url: candidate.url,
      anchor: candidate.anchor,
      score: candidate.score,
    }),
  );

  return { chunks, empty: chunks.length === 0, bestScore };
}
