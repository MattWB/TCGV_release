const ABSOLUTE_SCHEMES = ["http://", "https://", "//", "mailto:", "tel:", "data:"];

export function withBase(href: string): string {
  if (!href || href.startsWith("#")) return href;
  if (ABSOLUTE_SCHEMES.some((scheme) => href.startsWith(scheme))) return href;
  if (!href.startsWith("/")) return href;

  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = baseUrl === "/" ? "" : baseUrl.replace(/\/+$/, "");
  return normalizedBase ? `${normalizedBase}${href}` : href;
}
