import { SHOP_CATEGORY_LABELS, SHOP_SORT_LABELS } from "./shopCatalogConfig";
import type { CatalogFilterCategory } from "./shopTypes";
import type { SortKey } from "./shopUrlState";

type Props = {
  categories: CatalogFilterCategory[];
  selectedCategory: CatalogFilterCategory;
  searchQuery: string;
  selectedSort: SortKey;
  onCategoryChange: (nextCategory: CatalogFilterCategory) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function ShopCatalogControls({
  categories,
  selectedCategory,
  searchQuery,
  selectedSort,
  onCategoryChange,
  onQueryChange,
  onSortChange,
}: Props) {
  return (
    <div className="card-premium still p-4 md:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <div className="flex flex-wrap gap-2">
          {categories.map((slug) => (
            <button
              key={slug}
              type="button"
              aria-pressed={selectedCategory === slug}
              onClick={() => onCategoryChange(slug)}
              className={`tcgv-pill tcgv-focus transition-colors ${
                selectedCategory === slug
                  ? "tcgv-pill--ball"
                  : "tcgv-pill--muted hover:tcgv-pill--soft"
              }`}
            >
              {SHOP_CATEGORY_LABELS[slug]}
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
            value={searchQuery}
            onChange={(event) => onQueryChange(event.target.value)}
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
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value)}
            className="tcgv-focus h-10 w-full min-w-[190px] rounded-xl border border-clubblack/15 bg-clubwhite px-3 text-sm text-clubblack"
          >
            <option value="name-asc">{SHOP_SORT_LABELS["name-asc"]}</option>
            <option value="price-asc">{SHOP_SORT_LABELS["price-asc"]}</option>
            <option value="price-desc">{SHOP_SORT_LABELS["price-desc"]}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
