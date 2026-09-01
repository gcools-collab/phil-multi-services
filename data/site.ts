function normalizeUrl(value: string | undefined) {
  const trimmedValue = value?.trim().replace(/\/$/, "");

  if (!trimmedValue) return undefined;

  return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
}

const configuredUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
const vercelUrl = normalizeUrl(
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL,
);
const resolvedUrl = configuredUrl ?? vercelUrl;
const isProduction = process.env.NODE_ENV === "production";

const isLocalUrl = resolvedUrl
  ? ["localhost", "127.0.0.1", "::1"].includes(new URL(resolvedUrl).hostname)
  : false;
const isSecureUrl = resolvedUrl ? new URL(resolvedUrl).protocol === "https:" : false;

if (isProduction && (!resolvedUrl || isLocalUrl || !isSecureUrl)) {
  throw new Error(
    "Une URL publique HTTPS est requise via NEXT_PUBLIC_SITE_URL ou l’environnement Vercel avant un build de production.",
  );
}

export const siteUrl = resolvedUrl ?? "http://localhost:3000";
