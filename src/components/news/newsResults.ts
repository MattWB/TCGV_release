import type {
  NewsArticleWithImage,
  NewsCategory,
} from "../../data/newsArticles";
import {
  DEFAULT_CATEGORY,
  DEFAULT_PAGE,
  PAGE_SIZE,
  normalizeQuery,
} from "./newsUrlState";

export function normalizeNewsSearchText(query: string): string {
  return normalizeQuery(query).toLowerCase();
}

export function filterNewsArticles(
  articles: NewsArticleWithImage[],
  category: NewsCategory,
  normalizedQuery: string,
): NewsArticleWithImage[] {
  return articles.filter((article) => {
    if (category !== DEFAULT_CATEGORY && article.category !== category) {
      return false;
    }
    if (!normalizedQuery) return true;

    const haystack = normalizeNewsSearchText(
      `${article.title} ${article.excerpt} ${article.category}`,
    );

    return haystack.includes(normalizedQuery);
  });
}

export function getFeaturedNewsArticle(
  articles: NewsArticleWithImage[],
): NewsArticleWithImage | null {
  return articles.find((article) => article.featured) ?? null;
}

export function shouldShowFeaturedNewsArticle({
  category,
  page,
  normalizedQuery,
  featuredNewsArticle,
}: {
  category: NewsCategory;
  page: number;
  normalizedQuery: string;
  featuredNewsArticle: NewsArticleWithImage | null;
}): boolean {
  return (
    category === DEFAULT_CATEGORY &&
    page === DEFAULT_PAGE &&
    normalizedQuery.length === 0 &&
    featuredNewsArticle !== null
  );
}

export function getNewsFeedItems(
  filteredArticles: NewsArticleWithImage[],
  showFeatured: boolean,
  featuredNewsArticle: NewsArticleWithImage | null,
): NewsArticleWithImage[] {
  if (!showFeatured || !featuredNewsArticle) return filteredArticles;
  return filteredArticles.filter(
    (article) => article.id !== featuredNewsArticle.id,
  );
}

export function getTotalPages(itemCount: number, pageSize = PAGE_SIZE): number {
  return Math.max(DEFAULT_PAGE, Math.ceil(itemCount / pageSize));
}

export function clampPage(page: number, totalPages: number): number {
  const normalizedTotalPages = Math.max(DEFAULT_PAGE, totalPages);
  return Math.min(Math.max(page, DEFAULT_PAGE), normalizedTotalPages);
}

export function getPaginatedNewsItems(
  items: NewsArticleWithImage[],
  currentPage: number,
  pageSize = PAGE_SIZE,
): NewsArticleWithImage[] {
  const start = (currentPage - DEFAULT_PAGE) * pageSize;
  return items.slice(start, start + pageSize);
}
