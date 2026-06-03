import ShopCatalogControls from "./ShopCatalogControls";
import ShopCatalogResults from "./ShopCatalogResults";
import type { ShopItemClient } from "./shopTypes";
import { useShopCatalogState } from "./useShopCatalogState";

type Props = {
  items: ShopItemClient[];
};

export default function ShopCatalog({ items }: Props) {
  const {
    catalogRef,
    categories,
    category,
    query,
    sort,
    results,
    onCategoryChange,
    onQueryChange,
    onSortChange,
  } = useShopCatalogState(items);

  return (
    <section
      ref={catalogRef}
      className="tcgv-stable-panel tcgv-no-anchor space-y-6"
      style={{ overflowAnchor: "none" }}
    >
      <ShopCatalogControls
        categories={categories}
        selectedCategory={category}
        searchQuery={query}
        selectedSort={sort}
        onCategoryChange={onCategoryChange}
        onQueryChange={onQueryChange}
        onSortChange={onSortChange}
      />

      <ShopCatalogResults items={results} />
    </section>
  );
}
