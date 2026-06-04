import type { NewsArticleWithImage } from "../../data/newsArticles";

type FeaturedNewsArticleProps = {
  article: NewsArticleWithImage;
};

export function FeaturedNewsArticle({ article }: FeaturedNewsArticleProps) {
  return (
    <article className="mx-auto max-w-5xl card-premium group overflow-hidden ring-1 ring-primary/25 hover:ring-primary/40 transition-all duration-400">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-clubwhite">
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
          <div className="absolute left-4 top-4">
            <span className="tcgv-pill tcgv-pill--primary text-xs">
              À la une
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{article.date}</span>
            <span className="tcgv-pill tcgv-pill--soft text-xs">
              {article.category}
            </span>
          </div>

          <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          <p className="mt-4 text-base/7 text-muted-foreground">
            {article.excerpt}
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
  );
}
