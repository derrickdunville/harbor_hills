import { headers } from "next/headers";

export const getServerBaseUrl = async () => {
  const canonicalBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (canonicalBaseUrl) {
    return canonicalBaseUrl.replace(/\/+$/, "");
  }

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return "http://localhost:3000";
  }

  return `${proto}://${host}`;
};
