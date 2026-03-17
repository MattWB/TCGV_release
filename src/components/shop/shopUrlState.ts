export type SortKey = "name-asc" | "price-asc" | "price-desc";

export type UrlState<Cat extends string> = {
  category: Cat;
  query: string;
  page: number;
};

export const DEFAULT_SORT: SortKey = "name-asc";
export const DEFAULT_QUERY = "";
export const DEFAULT_PAGE = 1;
export const URL_ALL = "all";
export const DEBOUNCE_MS = 250;

export function normalizeQuery(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function normalizeSearchText(text: string): string {
  return normalizeQuery(text).toLowerCase();
}

export function parsePage(value: string | null): number {
  if (!value) return DEFAULT_PAGE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_PAGE;
  return parsed;
}

export function parseSort(search: string, validSortSet: Set<SortKey>): SortKey {
  const params = new URLSearchParams(search);
  const rawSort = normalizeSearchText(
    params.get("s") ?? DEFAULT_SORT,
  ) as SortKey;
  return validSortSet.has(rawSort) ? rawSort : DEFAULT_SORT;
}

export function parseCategory<Cat extends string>(
  value: string | null,
  defaultCategory: Cat,
  validProductCategorySet: Set<Cat>,
): Cat {
  if (!value) return defaultCategory;

  const normalized = normalizeSearchText(value) as Cat;
  if (normalized === ("tous" as Cat) || normalized === (URL_ALL as Cat))
    return defaultCategory;

  if (validProductCategorySet.has(normalized)) return normalized;
  return defaultCategory;
}

export function parseUrlState<Cat extends string>(
  search: string,
  defaultCategory: Cat,
  validProductCategorySet: Set<Cat>,
): UrlState<Cat> {
  const params = new URLSearchParams(search);
  const rawCategory = params.get("cat") ?? params.get("c");
  const rawQuery = params.get("q") ?? DEFAULT_QUERY;
  const rawPage = params.get("p");

  return {
    category: parseCategory(
      rawCategory,
      defaultCategory,
      validProductCategorySet,
    ),
    query: normalizeQuery(rawQuery),
    page: parsePage(rawPage),
  };
}

export function buildSearch<Cat extends string>(
  state: UrlState<Cat>,
  defaultCategory: Cat,
): string {
  const params = new URLSearchParams();
  const normalizedQuery = normalizeQuery(state.query);

  params.set(
    "cat",
    state.category === defaultCategory ? URL_ALL : state.category,
  );
  if (normalizedQuery) params.set("q", normalizedQuery);
  if (state.page !== DEFAULT_PAGE) params.set("p", String(state.page));

  const built = params.toString();
  return built ? `?${built}` : "";
}

export function buildSearchWithSort<Cat extends string>(
  state: UrlState<Cat>,
  sort: SortKey,
  defaultCategory: Cat,
): string {
  const params = new URLSearchParams(
    buildSearch(state, defaultCategory).slice(1),
  );
  if (sort !== DEFAULT_SORT) params.set("s", sort);
  const built = params.toString();
  return built ? `?${built}` : "";
}

export function ensureDefaultUrlState<Cat extends string>(
  defaultCategory: Cat,
  validProductCategorySet: Set<Cat>,
): string {
  const url = new URL(window.location.href);

  if (!url.searchParams.has("cat")) {
    const legacyCategory = url.searchParams.get("c");
    const parsed = parseCategory(
      legacyCategory,
      defaultCategory,
      validProductCategorySet,
    );
    url.searchParams.set("cat", parsed === defaultCategory ? URL_ALL : parsed);
    url.searchParams.delete("c");
    window.history.replaceState(
      null,
      "",
      `${url.pathname}?${url.searchParams.toString()}${url.hash}`,
    );
  }

  const currentCat = url.searchParams.get("cat");
  if (currentCat && normalizeSearchText(currentCat) === "tous") {
    url.searchParams.set("cat", URL_ALL);
    window.history.replaceState(
      null,
      "",
      `${url.pathname}?${url.searchParams.toString()}${url.hash}`,
    );
  }

  return window.location.search;
}
