import {
  newsCategories,
  type NewsArticleWithImage,
} from "../../data/newsArticles";
import { FeaturedNewsArticle } from "../news/FeaturedNewsArticle";
import { NewsArticleCard } from "../news/NewsArticleCard";
import { NewsFeedControls } from "../news/NewsFeedControls";
import { NewsPagination } from "../news/NewsPagination";
import { useNewsFeedState } from "../news/useNewsFeedState";
import { withBase } from "../../utils/url";

type Props = {
  articles: NewsArticleWithImage[];
};

export default function NewsFeed({ articles }: Props) {
  const {
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
  } = useNewsFeedState(articles);

  return (
    <section className="tcgv-stable-panel tcgv-no-anchor space-y-8">
      <NewsFeedControls
        categories={newsCategories}
        category={category}
        query={query}
        onCategoryChange={onCategoryChange}
        onQueryChange={onQueryChange}
      />

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {feedItems.length} {feedItems.length > 1 ? "actualités" : "actualité"}
      </p>

      <div ref={containerRef}>
        {showFeatured && featuredNewsArticle && (
          <FeaturedNewsArticle article={featuredNewsArticle} />
        )}

        {paginatedItems.length > 0 ? (
          <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-8">
            {paginatedItems.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
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

        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </section>
  );
}
