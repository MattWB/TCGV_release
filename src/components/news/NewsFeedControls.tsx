import type { NewsCategory } from "../../data/newsArticles";

type NewsFeedControlsProps = {
  categories: NewsCategory[];
  category: NewsCategory;
  query: string;
  onCategoryChange: (category: NewsCategory) => void;
  onQueryChange: (query: string) => void;
};

export function NewsFeedControls({
  categories,
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: NewsFeedControlsProps) {
  return (
    <div className="card-premium still p-4 md:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-end">
        <fieldset>
          <legend className="sr-only">
            Filtrer les actualités par catégorie
          </legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
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
  );
}
