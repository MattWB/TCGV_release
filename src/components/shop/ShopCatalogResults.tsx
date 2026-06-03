import ProductCardReact from "./ProductCardReact";
import { categoryIcons } from "./shopCategoryIcons";
import type { ShopItemClient } from "./shopTypes";
import { withBase } from "../../utils/url";

type Props = {
  items: ShopItemClient[];
};

export default function ShopCatalogResults({ items }: Props) {
  return (
    <>
      <div aria-live="polite" className="text-sm text-muted-foreground">
        {items.length} {items.length > 1 ? "articles" : "article"}
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
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
    </>
  );
}
