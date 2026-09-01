const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const isProduction = process.env.NODE_ENV === "production";

const isLocalUrl = configuredUrl
  ? ["localhost", "127.0.0.1", "::1"].includes(new URL(configuredUrl).hostname)
  : false;
const isSecureUrl = configuredUrl ? new URL(configuredUrl).protocol === "https:" : false;

if (isProduction && (!configuredUrl || isLocalUrl || !isSecureUrl)) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL doit être défini avec une URL publique HTTPS non locale avant un build de production.",
  );
}

export const siteUrl = configuredUrl ?? "http://localhost:3000";
