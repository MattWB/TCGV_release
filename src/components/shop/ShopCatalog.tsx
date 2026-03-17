import { useEffect, useMemo, useRef, useState } from "react";

import ProductCardReact from "./ProductCardReact";
import { categoryIcons } from "./shopCategoryIcons";
import { useScrollLockFrames } from "./useScrollLockFrames";
import { getFilteredSortedItems } from "./shopResults";
import { scrollToAnchorById } from "../islands/anchorScroll";
import { withBase } from "../../utils/url";
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

type ProductCategory =
  | "raquettes"
  | "balles"
  | "vetements"
  | "accessoires"
  | "goodies";
type ShopCategory = "Tous" | ProductCategory;

type ShopItemClient = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  priceCents: number;
  category: ProductCategory;
  tags?: string[];
  badge?: string;
  image: {
    src: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
  };
};

type Props = {
  items: ShopItemClient[];
};

const DEFAULT_CATEGORY: ShopCategory = "Tous";
const SHOP_ANCHOR_ID = "catalogue";
const validSortSet = new Set<SortKey>(["name-asc", "price-asc", "price-desc"]);

const categoryLabel: Record<ShopCategory, string> = {
  Tous: "Tous",
  raquettes: "Raquettes",
  balles: "Balles",
  vetements: "Vêtements",
  accessoires: "Accessoires",
  goodies: "Goodies Club",
};

const sortLabel: Record<SortKey, string> = {
  "name-asc": "Nom A  Z",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
};

export default function ShopCatalog({ items }: Props) {
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
    () => new Set<ShopCategory>([DEFAULT_CATEGORY, ...allCategorySlugs]),
    [allCategorySlugs],
  );

  const categories = useMemo<ShopCategory[]>(
    () => [DEFAULT_CATEGORY, ...allCategorySlugs],
    [allCategorySlugs],
  );

  const [category, setCategory] = useState<ShopCategory>(DEFAULT_CATEGORY);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);
  const [debouncedQuery, setDebouncedQuery] = useState(DEFAULT_QUERY);

  const { armScrollLock } = useScrollLockFrames();

  const lastSyncedRef = useRef<{
    url: UrlState<ShopCategory>;
    sort: SortKey;
  } | null>(null);
  const shouldScrollAfterSearchRef = useRef(false);
  const shouldScrollAfterControlsRef = useRef(false);

  // INIT
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const search = ensureDefaultUrlState(
      DEFAULT_CATEGORY,
      validProductCategorySet,
    );
    const next = parseUrlState(
      search,
      DEFAULT_CATEGORY,
      validProductCategorySet,
    );
    const nextSort = parseSort(search, validSortSet);

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
        DEFAULT_CATEGORY,
        validProductCategorySet,
      );
      const stateSort = parseSort(window.location.search, validSortSet);

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

  // DEBOUNCE
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
      if (shouldScrollAfterSearchRef.current) {
        scrollToAnchorById(SHOP_ANCHOR_ID);
        shouldScrollAfterSearchRef.current = false;
      }
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!shouldScrollAfterControlsRef.current) return;
    scrollToAnchorById(SHOP_ANCHOR_ID);
    shouldScrollAfterControlsRef.current = false;
  }, [category, sort]);

  // SYNC URL
  useEffect(() => {
    const nextUrlState: UrlState<ShopCategory> = {
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
      DEFAULT_CATEGORY,
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
      DEFAULT_CATEGORY,
      debouncedQuery,
      sort,
    );
  }, [items, category, debouncedQuery, sort]);

  const onCategoryChange = (nextCategory: ShopCategory) => {
    if (!validCategorySet.has(nextCategory)) return;
    if (nextCategory === category) return;
    shouldScrollAfterControlsRef.current = true;
    armScrollLock(4);
    setCategory(nextCategory);
    setPage(DEFAULT_PAGE);
  };

  const onQueryChange = (value: string) => {
    shouldScrollAfterSearchRef.current = true;
    armScrollLock(4);
    setQuery(value);
    setPage(DEFAULT_PAGE);
  };

  const onSortChange = (value: string) => {
    const nextSort = validSortSet.has(value as SortKey)
      ? (value as SortKey)
      : DEFAULT_SORT;
    if (nextSort === sort) return;
    shouldScrollAfterControlsRef.current = true;
    armScrollLock(4);
    setSort(nextSort);
  };

  return (
    <section
      className="tcgv-stable-panel tcgv-no-anchor space-y-6"
      style={{ overflowAnchor: "none" }}
    >
      <div className="card-premium still p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <div className="flex flex-wrap gap-2">
            {categories.map((slug) => (
              <button
                key={slug}
                type="button"
                aria-pressed={category === slug}
                onClick={() => onCategoryChange(slug)}
                className={`tcgv-pill tcgv-focus transition-colors ${
                  category === slug
                    ? "tcgv-pill--ball"
                    : "tcgv-pill--muted hover:tcgv-pill--soft"
                }`}
              >
                {categoryLabel[slug]}
              </button>
            ))}
          </div>

          <div className="min-w-0">
            <label htmlFor="shop-search" className="sr-only">
              Rechercher un article
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Rechercher un article"
              className="tcgv-focus h-10 w-full min-w-[220px] rounded-xl border border-clubblack/15 bg-clubwhite px-3 text-sm text-clubblack"
            />
          </div>

          <div>
            <label htmlFor="shop-sort" className="sr-only">
              Trier les articles
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="tcgv-focus h-10 w-full min-w-[190px] rounded-xl border border-clubblack/15 bg-clubwhite px-3 text-sm text-clubblack"
            >
              <option value="name-asc">{sortLabel["name-asc"]}</option>
              <option value="price-asc">{sortLabel["price-asc"]}</option>
              <option value="price-desc">{sortLabel["price-desc"]}</option>
            </select>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="text-sm text-muted-foreground">
        {results.length} {results.length > 1 ? "articles" : "article"}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <ProductCardReact
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              priceLabel={item.priceLabel}
              badge={item.badge}
              categoryIcon={categoryIcons[item.category]}
            />
          ))}
        </div>
      ) : (
        <div className="card-premium still p-6 md:p-8 text-center">
          <p className="text-muted-foreground text-lg">
            Aucun produit dans cette catégorie pour le moment.
          </p>
          <div className="mt-5">
            <a
              className="tcgv-btn tcgv-btn--alt tcgv-focus w-full sm:w-auto px-8"
              href={withBase("/contact")}
            >
              Demander une disponibilité
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
