import { newsCategories, type NewsCategory } from "../../data/newsArticles";

export const DEFAULT_CATEGORY: NewsCategory = "Tous";
export const DEFAULT_QUERY = "";
export const DEFAULT_PAGE = 1;
export const DEBOUNCE_MS = 250;
export const PAGE_SIZE = 6;

export type NewsUrlState = {
  category: NewsCategory;
  query: string;
  page: number;
};

export function normalizeQuery(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function parsePage(value: string | null): number {
  if (!value) return DEFAULT_PAGE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_PAGE;
  return parsed;
}

export function parseUrlState(search: string): NewsUrlState {
  const params = new URLSearchParams(search);
  const rawCategory = (params.get("cat") ?? DEFAULT_CATEGORY) as NewsCategory;
  const rawQuery = params.get("q") ?? DEFAULT_QUERY;
  const rawPage = params.get("p");

  return {
    category: newsCategories.includes(rawCategory)
      ? rawCategory
      : DEFAULT_CATEGORY,
    query: normalizeQuery(rawQuery),
    page: parsePage(rawPage),
  };
}

export function buildSearch({ category, query, page }: NewsUrlState): string {
  const params = new URLSearchParams();
  const normalizedQuery = normalizeQuery(query);

  params.set("cat", category);
  if (normalizedQuery) params.set("q", normalizedQuery);
  if (page !== DEFAULT_PAGE) params.set("p", String(page));

  const built = params.toString();
  return built ? `?${built}` : "";
}

export function ensureDefaultUrlState(): string {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("cat")) {
    url.searchParams.set("cat", DEFAULT_CATEGORY);
    const nextHref = `${url.pathname}?${url.searchParams.toString()}${url.hash}`;
    window.history.replaceState(null, "", nextHref);
  }
  return url.search;
}
