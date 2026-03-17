import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  newsCategories,
  type NewsCategory,
  type NewsArticleWithImage,
} from "../../data/newsArticles";
import { scrollToAnchorById } from "./anchorScroll";
import { withBase } from "../../utils/url";

const DEFAULT_CATEGORY: NewsCategory = "Tous";
const DEFAULT_QUERY = "";
const DEFAULT_PAGE = 1;
const DEBOUNCE_MS = 250;
const PAGE_SIZE = 6;
const NEWS_ANCHOR_ID = "news-latest";

type UrlState = {
  category: NewsCategory;
  query: string;
  page: number;
};

type Props = {
  articles: NewsArticleWithImage[];
};

function normalizeQuery(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

function parsePage(value: string | null): number {
  if (!value) return DEFAULT_PAGE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_PAGE;
  return parsed;
}

function parseUrlState(search: string): UrlState {
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

function buildSearch({ category, query, page }: UrlState): string {
  const params = new URLSearchParams();
  const normalizedQuery = normalizeQuery(query);

  params.set("cat", category);
  if (normalizedQuery) params.set("q", normalizedQuery);
  if (page !== DEFAULT_PAGE) params.set("p", String(page));

  const built = params.toString();
  return built ? `?${built}` : "";
}

function ensureDefaultUrlState(): string {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("cat")) {
    url.searchParams.set("cat", DEFAULT_CATEGORY);
    const nextHref = `${url.pathname}?${url.searchParams.toString()}${url.hash}`;
    window.history.replaceState(null, "", nextHref);
  }
  return url.search;
}

function scrollToNewsAnchor(): void {
  scrollToAnchorById(NEWS_ANCHOR_ID);
}

export default function NewsFeed({ articles }: Props) {
  const [category, setCategory] = useState<NewsCategory>(DEFAULT_CATEGORY);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [debouncedQuery, setDebouncedQuery] = useState(DEFAULT_QUERY);
  const lastSyncedRef = useRef<UrlState | null>(null);
  const shouldScrollAfterSearchRef = useRef(false);

  // HEIGHT LOCK
  const panelRef = useRef<HTMLDivElement | null>(null);
  const releaseTimerRef = useRef<number | null>(null);

  const lockPanelHeight = () => {
    const el = panelRef.current;
    if (!el) return;

    // CLEAN
    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }

    const h = el.getBoundingClientRect().height;
    el.style.minHeight = `${Math.ceil(h)}px`;

    // RELEASE
    releaseTimerRef.current = window.setTimeout(() => {
      const node = panelRef.current;
      if (node) node.style.minHeight = "";
      releaseTimerRef.current = null;
    }, 350);
  };

  useLayoutEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    // AJOUT FILTRE URL
    const search = ensureDefaultUrlState();
    const next = parseUrlState(search);
    setCategory(next.category);
    setQuery(next.query);
    setDebouncedQuery(next.query);
    setPage(next.page);

    lastSyncedRef.current = {
      category: next.category,
      query: normalizeQuery(next.query),
      page: next.page,
    };

    const onPopState = () => {
      lockPanelHeight();

      const state = parseUrlState(window.location.search);
      setCategory(state.category);
      setQuery(state.query);
      setDebouncedQuery(state.query);
      setPage(state.page);
      lastSyncedRef.current = {
        category: state.category,
        query: normalizeQuery(state.query),
        page: state.page,
      };
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // LOCK AVANT DEBOUNCE
      lockPanelHeight();
      setDebouncedQuery(query);
      if (shouldScrollAfterSearchRef.current) {
        scrollToNewsAnchor();
        shouldScrollAfterSearchRef.current = false;
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  const normalizedQuery = useMemo(() => {
    return normalizeQuery(debouncedQuery).toLowerCase();
  }, [debouncedQuery]);

  const filteredByControls = useMemo(() => {
    return articles.filter((article) => {
      if (category !== DEFAULT_CATEGORY && article.category !== category) {
        return false;
      }
      if (!normalizedQuery) return true;

      const haystack = normalizeQuery(
        `${article.title} ${article.excerpt} ${article.category}`,
      ).toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [articles, category, normalizedQuery]);

  const featuredNewsArticle = useMemo(
    () => articles.find((article) => article.featured) ?? null,
    [articles],
  );

  const showFeatured =
    category === DEFAULT_CATEGORY &&
    page === DEFAULT_PAGE &&
    normalizedQuery.length === 0 &&
    featuredNewsArticle !== null;

  const feedItems = useMemo(() => {
    if (!showFeatured || !featuredNewsArticle) return filteredByControls;
    return filteredByControls.filter(
      (article) => article.id !== featuredNewsArticle.id,
    );
  }, [filteredByControls, showFeatured]);

  const totalPages = Math.max(1, Math.ceil(feedItems.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return feedItems.slice(start, start + PAGE_SIZE);
  }, [feedItems, currentPage]);

  useEffect(() => {
    // SYNC URL
    const nextState: UrlState = {
      category,
      query: normalizeQuery(debouncedQuery),
      page,
    };
    const prev = lastSyncedRef.current;

    if (
      prev &&
      prev.category === nextState.category &&
      prev.query === nextState.query &&
      prev.page === nextState.page
    ) {
      return;
    }

    const nextSearch = buildSearch(nextState);
    if (window.location.search !== nextSearch) {
      const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
      window.history.replaceState(null, "", nextUrl);
    }
    lastSyncedRef.current = nextState;
  }, [category, debouncedQuery, page]);

  const onCategoryChange = (nextCategory: NewsCategory) => {
    lockPanelHeight();
    setCategory(nextCategory);
    setPage(DEFAULT_PAGE);
  };

  const onQueryChange = (value: string) => {
    shouldScrollAfterSearchRef.current = true;
    lockPanelHeight();
    setQuery(value);
    setPage(DEFAULT_PAGE);
  };

  const goToPage = (nextPage: number) => {
    if (nextPage === currentPage) return;
    lockPanelHeight();
    setPage(nextPage);
    scrollToNewsAnchor();
  };

  return (
    <section className="tcgv-stable-panel tcgv-no-anchor space-y-8">
      <div className="card-premium still p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-end">
          <fieldset>
            <legend className="sr-only">
              Filtrer les actualités par catégorie
            </legend>
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => onCategoryChange(item)}
                  className={`tcgv-pill tcgv-focus transition-colors ${
                    category === item
                      ? "tcgv-pill--primary"
                      : "tcgv-pill--muted hover:tcgv-pill--soft"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="min-w-0">
            <label htmlFor="news-search" className="sr-only">
              Rechercher une actualité
            </label>
            <input
              id="news-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Rechercher une actualité..."
              className="tcgv-focus h-10 w-full rounded-xl border border-clubblack/15 bg-clubwhite px-3 text-sm text-clubblack"
            />
          </div>
        </div>
      </div>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {feedItems.length} {feedItems.length > 1 ? "actualités" : "actualité"}
      </p>

      {/* HEADLINE + ARTICLES */}
      <div ref={panelRef}>
        {showFeatured && featuredNewsArticle && (
          <article className="mx-auto max-w-5xl card-premium group overflow-hidden ring-1 ring-primary/25 hover:ring-primary/40 transition-all duration-400">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-clubwhite">
                <img
                  src={featuredNewsArticle.image.src}
                  srcSet={featuredNewsArticle.image.srcSet}
                  sizes={featuredNewsArticle.image.sizes}
                  width={featuredNewsArticle.image.width}
                  height={featuredNewsArticle.image.height}
                  alt={featuredNewsArticle.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute left-4 top-4">
                  <span className="tcgv-pill tcgv-pill--primary text-xs">
                    À la une
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>{featuredNewsArticle.date}</span>
                  <span className="tcgv-pill tcgv-pill--soft text-xs">
                    {featuredNewsArticle.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {featuredNewsArticle.title}
                </h3>

                <p className="mt-4 text-base/7 text-muted-foreground">
                  {featuredNewsArticle.excerpt}
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    className="tcgv-btn tcgv-btn--cta tcgv-focus w-fit px-6"
                    data-toast="news"
                  >
                    Lire l&apos;article
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {paginatedItems.length > 0 ? (
          <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-8">
            {paginatedItems.map((article) => (
              <article
                key={article.id}
                className="card-premium group h-full overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-clubwhite">
                  <img
                    src={article.image.src}
                    srcSet={article.image.srcSet}
                    sizes={article.image.sizes}
                    width={article.image.width}
                    height={article.image.height}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-clubwhite/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="tcgv-pill tcgv-pill--soft text-xs">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm/6 text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-6 text-right">
                    <button
                      type="button"
                      className="tcgv-focus inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
                      data-toast="news"
                    >
                      Lire la suite
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-premium still p-6 md:p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Aucune actualité dans cette catégorie pour le moment.
            </p>
            <div className="mt-5">
              <a
                href={withBase("/contact")}
                className="tcgv-btn tcgv-btn--alt tcgv-focus w-full sm:w-auto px-8"
              >
                Nous contacter
              </a>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            aria-label="Pagination des actualités"
          >
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="tcgv-btn tcgv-btn--alt tcgv-focus px-5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
            >
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  aria-current={currentPage === item ? "page" : undefined}
                  className={`tcgv-pill tcgv-focus transition-colors ${
                    currentPage === item
                      ? "tcgv-pill--primary pointer-events-none"
                      : "tcgv-pill--muted hover:tcgv-pill--soft cursor-pointer"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="tcgv-btn tcgv-btn--alt tcgv-focus px-5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
            >
              Suivant
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
