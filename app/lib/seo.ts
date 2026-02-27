const FALLBACK_SITE_URL = "https://hooktap.de";

function normalizeUrl(value: string): string {
  const withProtocol =
    value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitUrl) {
    return normalizeUrl(explicitUrl);
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) {
    return normalizeUrl(vercelUrl);
  }

  return FALLBACK_SITE_URL;
}

export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
}
