import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança aplicados a todas as respostas.
 *
 * A CSP abaixo é restritiva de propósito: o site não chama nenhum recurso
 * externo em runtime (fontes são self-hosted pelo next/font, imagens e
 * vídeos são locais). O `connect-src 'self'` é a mais relevante, porque
 * bloqueia exfiltração para domínios externos mesmo que um segredo apareça
 * por engano no bundle do navegador.
 *
 * `script-src` precisa de 'unsafe-inline' porque o Next.js embute scripts de
 * hidratação sem nonce. Para remover essa exceção seria preciso CSP
 * nonces/hash via middleware, o que é mais rígido do que o caso de uso pede.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "media-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
