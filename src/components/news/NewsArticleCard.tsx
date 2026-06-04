import type { NewsArticleWithImage } from "../../data/newsArticles";

type NewsArticleCardProps = {
  article: NewsArticleWithImage;
};

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <article className="card-premium group h-full overflow-hidden">
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
  );
}
