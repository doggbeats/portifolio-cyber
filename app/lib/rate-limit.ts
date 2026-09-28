import "server-only";

/**
 * Limitação de taxa em memória.
 *
 * ATENÇÃO — limitação real em serverless exige um armazenamento externo
 * (Upstash Redis, Vercel KV, Cloudflare). Este Map vive no processo e, por
 * isso, é zerado a cada cold start e não é compartilhado entre instâncias.
 * Ele cumpre duas funções:
 *
 *   1. Barra o abusive que atinge a mesma instância quente (o caso comum de
 *      um script rodando em laço).
 *   2. Devolve 429 cedo, evitando gastar chamada do Gemini.
 *
 * Combine com o teto diário global abaixo: se a cota do Gemini acabar, o
 * bot para de responder em vez de propagar erro 429 do provedor.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

/** Teto absoluto de respostas por dia, independente de quantos IPs batem. */
const DAILY_LIMIT = Number(process.env.RAG_DAILY_LIMIT ?? 300);
/** Requisições por IP numa janela curta. */
const PER_IP_LIMIT = Number(process.env.RAG_IP_LIMIT ?? 10);
const PER_IP_WINDOW_MS = 2 * 60 * 1000;

/**
 * Teto de chaves rastreadas. Sem isso, um atacante que varre IPs de origem
 * diferentes enche o Map e a instância morre de memória (memory DoS).
 */
const MAX_TRACKED_KEYS = 10_000;

const buckets = new Map<string, Bucket>();
let daily: Bucket = { count: 0, resetAt: Date.now() + 86_400_000 };

export interface RateLimitResult {
  ok: boolean;
  limit: "ip" | "daily" | null;
  remaining: number;
  /** Segundos a esperar, já arredondado para cima. */
  retryAfter: number;
}

function remainingTtl(bucket: Bucket): number {
  return Math.max(1, Math.ceil((bucket.resetAt - Date.now()) / 1000));
}

/** Remove entradas expiradas. Chamado a cada verificação para conter o Map. */
function sweep(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  // Ainda assim cheio (todas ativas): descarta o estado mais antigo em vez de
  // crescer sem limite. Perder histórico de um IP é preferível a um OOM.
  if (buckets.size >= MAX_TRACKED_KEYS) {
    const oldest = [...buckets.entries()].sort(
      (a, b) => a[1].resetAt - b[1].resetAt,
    );
    for (const [key] of oldest.slice(0, Math.floor(MAX_TRACKED_KEYS / 4))) {
      buckets.delete(key);
    }
  }
}

function consume(
  key: string,
  limit: number,
  windowMs: number,
  now: number,
): { ok: boolean; remaining: number; retryAfter: number } {
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: remainingTtl(current) };
  }

  current.count += 1;
  return { ok: true, remaining: limit - current.count, retryAfter: 0 };
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  sweep(now);

  // Teto diário primeiro: é o que protege a cota do Gemini.
  if (daily.resetAt <= now) {
    daily = { count: 0, resetAt: now + 86_400_000 };
  }

  if (daily.count >= DAILY_LIMIT) {
    return {
      ok: false,
      limit: "daily",
      remaining: 0,
      retryAfter: remainingTtl(daily),
    };
  }

  const ipResult = consume(`ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_MS, now);
  if (!ipResult.ok) {
    return { ...ipResult, limit: "ip" };
  }

  daily.count += 1;
  return { ...ipResult, limit: null };
}

/** Libera a cota quando a resposta sai sem gastar a chamada do Gemini. */
export function refundDailyQuota() {
  if (daily.count > 0) daily.count -= 1;
}

/**
 * IP do visitante. Na Vercel, x-forwarded-for é a única fonte confiável e
 * vem preenchida pela borda. Nunca use x-real-ip direto de um header
 * manipulável, e não confie no IP de x-forwarded-for sem tomar o primeiro
 * valor, que é o cliente real.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

/** Só para testes: zera o estado em memória. */
export function __resetRateLimit() {
  buckets.clear();
  daily = { count: 0, resetAt: Date.now() + 86_400_000 };
}
