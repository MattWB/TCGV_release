import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import {
  SHOP_CATALOG_DEFAULT_CATEGORY,
  VALID_SHOP_SORT_SET,
} from "./shopCatalogConfig";
import { getFilteredSortedItems } from "./shopResults";
import type {
  CatalogFilterCategory,
  ProductCategory,
  ShopItemClient,
} from "./shopTypes";
import {
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  DEFAULT_SORT,
  DEBOUNCE_MS,
  type SortKey,
  type UrlState,
  buildSearchWithSort,
  ensureDefaultUrlState,
  normalizeQuery,
  parseSort,
  parseUrlState,
} from "./shopUrlState";
import { useViewportStability } from "../useViewportStability";

type ShopCatalogState = {
  catalogRef: RefObject<HTMLElement | null>;
  categories: CatalogFilterCategory[];
  category: CatalogFilterCategory;
  query: string;
  sort: SortKey;
  results: ShopItemClient[];
  onCategoryChange: (nextCategory: CatalogFilterCategory) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function useShopCatalogState(items: ShopItemClient[]): ShopCatalogState {
  const allCategorySlugs = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.category))) as ProductCategory[],
    [items],
  );

  const validProductCategorySet = useMemo(
    () => new Set<ProductCategory>(allCategorySlugs),
    [allCategorySlugs],
  );

  const validCategorySet = useMemo(
    () =>
      new Set<CatalogFilterCategory>([
        SHOP_CATALOG_DEFAULT_CATEGORY,
        ...allCategorySlugs,
      ]),
    [allCategorySlugs],
  );

  const categories = useMemo<CatalogFilterCategory[]>(
    () => [SHOP_CATALOG_DEFAULT_CATEGORY, ...allCategorySlugs],
    [allCategorySlugs],
  );

  const [category, setCategory] = useState<CatalogFilterCategory>(
    SHOP_CATALOG_DEFAULT_CATEGORY,
  );
  const [query, setQuery] = useState(DEFAULT_QUERY);
  // URL-ready pagination state. It stays internal until pagination is rendered.
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);
  const [debouncedQuery, setDebouncedQuery] = useState(DEFAULT_QUERY);

  const lastSyncedRef = useRef<{
    url: UrlState<CatalogFilterCategory>;
    sort: SortKey;
  } | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const search = ensureDefaultUrlState(
      SHOP_CATALOG_DEFAULT_CATEGORY,
      validProductCategorySet,
    );
    const next = parseUrlState(
      search,
      SHOP_CATALOG_DEFAULT_CATEGORY,
      validProductCategorySet,
    );
    const nextSort = parseSort(search, VALID_SHOP_SORT_SET);

    setCategory(next.category);
    setQuery(next.query);
    setDebouncedQuery(next.query);
    setPage(next.page);
    setSort(nextSort);

    lastSyncedRef.current = {
      url: {
        category: next.category,
        query: normalizeQuery(next.query),
        page: next.page,
      },
      sort: nextSort,
    };

    const onPopState = () => {
      const state = parseUrlState(
        window.location.search,
        SHOP_CATALOG_DEFAULT_CATEGORY,
        validProductCategorySet,
      );
      const stateSort = parseSort(window.location.search, VALID_SHOP_SORT_SET);

      setCategory(state.category);
      setQuery(state.query);
      setDebouncedQuery(state.query);
      setPage(state.page);
      setSort(stateSort);

      lastSyncedRef.current = {
        url: {
          category: state.category,
          query: normalizeQuery(state.query),
          page: state.page,
        },
        sort: stateSort,
      };
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [validProductCategorySet]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const nextUrlState: UrlState<CatalogFilterCategory> = {
      category,
      query: normalizeQuery(debouncedQuery),
      page,
    };

    const previous = lastSyncedRef.current;
    if (
      previous &&
      previous.url.category === nextUrlState.category &&
      previous.url.query === nextUrlState.query &&
      previous.url.page === nextUrlState.page &&
      previous.sort === sort
    )
      return;

    const nextSearch = buildSearchWithSort(
      nextUrlState,
      sort,
      SHOP_CATALOG_DEFAULT_CATEGORY,
    );

    if (window.location.search !== nextSearch) {
      const hash = window.location.hash;
      const keepHash = hash && hash !== "#catalogue";
      const nextUrl = `${window.location.pathname}${nextSearch}${keepHash ? hash : ""}`;
      window.history.replaceState(null, "", nextUrl);
    }

    lastSyncedRef.current = { url: nextUrlState, sort };
  }, [category, debouncedQuery, page, sort]);

  const results = useMemo(() => {
    return getFilteredSortedItems(
      items,
      category,
      SHOP_CATALOG_DEFAULT_CATEGORY,
      debouncedQuery,
      sort,
    );
  }, [items, category, debouncedQuery, sort]);
  const { containerRef: catalogRef, requestViewportStabilization } =
    useViewportStability({
      watchKey: `${category}:${debouncedQuery}:${sort}:${results.length}`,
    });

  const onCategoryChange = (nextCategory: CatalogFilterCategory) => {
    if (!validCategorySet.has(nextCategory)) return;
    if (nextCategory === category) return;
    requestViewportStabilization();
    setCategory(nextCategory);
    setPage(DEFAULT_PAGE);
  };

  const onQueryChange = (value: string) => {
    requestViewportStabilization();
    setQuery(value);
    setPage(DEFAULT_PAGE);
  };

  const onSortChange = (value: string) => {
    const nextSort = VALID_SHOP_SORT_SET.has(value as SortKey)
      ? (value as SortKey)
      : DEFAULT_SORT;
    if (nextSort === sort) return;
    requestViewportStabilization();
    setSort(nextSort);
  };

  return {
    catalogRef,
    categories,
    category,
    query,
    sort,
    results,
    onCategoryChange,
    onQueryChange,
    onSortChange,
  };
}
