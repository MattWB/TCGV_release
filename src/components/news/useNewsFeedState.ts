import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import type {
  NewsArticleWithImage,
  NewsCategory,
} from "../../data/newsArticles";
import { scrollToAnchorById } from "../islands/anchorScroll";
import { useViewportStability } from "../useViewportStability";
import {
  DEFAULT_CATEGORY,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  DEBOUNCE_MS,
  buildSearch,
  ensureDefaultUrlState,
  normalizeQuery,
  parseUrlState,
  type NewsUrlState,
} from "./newsUrlState";
import {
  clampPage,
  filterNewsArticles,
  getFeaturedNewsArticle,
  getNewsFeedItems,
  getPaginatedNewsItems,
  getTotalPages,
  normalizeNewsSearchText,
  shouldShowFeaturedNewsArticle,
} from "./newsResults";

const NEWS_ANCHOR_ID = "news-latest";

type NewsFeedState = {
  containerRef: RefObject<HTMLDivElement | null>;
  category: NewsCategory;
  query: string;
  feedItems: NewsArticleWithImage[];
  featuredNewsArticle: NewsArticleWithImage | null;
  showFeatured: boolean;
  paginatedItems: NewsArticleWithImage[];
  totalPages: number;
  currentPage: number;
  onCategoryChange: (nextCategory: NewsCategory) => void;
  onQueryChange: (value: string) => void;
  goToPage: (nextPage: number) => void;
};

function scrollToNewsAnchor(): void {
  scrollToAnchorById(NEWS_ANCHOR_ID);
}

export function useNewsFeedState(
  articles: NewsArticleWithImage[],
): NewsFeedState {
  const [category, setCategory] = useState<NewsCategory>(DEFAULT_CATEGORY);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [debouncedQuery, setDebouncedQuery] = useState(DEFAULT_QUERY);
  const lastSyncedRef = useRef<NewsUrlState | null>(null);
  const shouldScrollAfterSearchRef = useRef(false);

  const normalizedQuery = useMemo(() => {
    return normalizeNewsSearchText(debouncedQuery);
  }, [debouncedQuery]);

  const filteredByControls = useMemo(() => {
    return filterNewsArticles(articles, category, normalizedQuery);
  }, [articles, category, normalizedQuery]);

  const featuredNewsArticle = useMemo(
    () => getFeaturedNewsArticle(articles),
    [articles],
  );

  const showFeatured = shouldShowFeaturedNewsArticle({
    category,
    page,
    normalizedQuery,
    featuredNewsArticle,
  });

  const feedItems = useMemo(() => {
    return getNewsFeedItems(
      filteredByControls,
      showFeatured,
      featuredNewsArticle,
    );
  }, [featuredNewsArticle, filteredByControls, showFeatured]);

  const totalPages = getTotalPages(feedItems.length);
  const currentPage = clampPage(page, totalPages);

  const paginatedItems = useMemo(() => {
    return getPaginatedNewsItems(feedItems, currentPage);
  }, [feedItems, currentPage]);

  const { containerRef, requestViewportStabilization } =
    useViewportStability<HTMLDivElement>({
      watchKey: `${category}:${normalizedQuery}:${currentPage}:${feedItems.length}:${showFeatured ? 1 : 0}`,
    });

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
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
      requestViewportStabilization();

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
  }, [requestViewportStabilization]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      requestViewportStabilization();
      setDebouncedQuery(query);
      if (shouldScrollAfterSearchRef.current) {
        scrollToNewsAnchor();
        shouldScrollAfterSearchRef.current = false;
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, requestViewportStabilization]);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage, page]);

  useEffect(() => {
    const nextState: NewsUrlState = {
      category,
      query: normalizeQuery(debouncedQuery),
      page: currentPage,
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
  }, [category, currentPage, debouncedQuery]);

  const onCategoryChange = (nextCategory: NewsCategory) => {
    requestViewportStabilization();
    setCategory(nextCategory);
    setPage(DEFAULT_PAGE);
  };

  const onQueryChange = (value: string) => {
    shouldScrollAfterSearchRef.current = true;
    requestViewportStabilization();
    setQuery(value);
    setPage(DEFAULT_PAGE);
  };

  const goToPage = (nextPage: number) => {
    if (nextPage === currentPage) return;
    requestViewportStabilization();
    setPage(nextPage);
    scrollToNewsAnchor();
  };

  return {
    containerRef,
    category,
    query,
    feedItems,
    featuredNewsArticle,
    showFeatured,
    paginatedItems,
    totalPages,
    currentPage,
    onCategoryChange,
    onQueryChange,
    goToPage,
  };
}
