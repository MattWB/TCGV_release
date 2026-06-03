import type { CatalogFilterCategory } from "./shopTypes";
import type { SortKey } from "./shopUrlState";

export const SHOP_CATALOG_DEFAULT_CATEGORY: CatalogFilterCategory = "Tous";
export const SHOP_CATALOG_ANCHOR_ID = "catalogue";

export const SHOP_SORT_KEYS = [
  "name-asc",
  "price-asc",
  "price-desc",
] as const satisfies readonly SortKey[];

export const VALID_SHOP_SORT_SET: ReadonlySet<SortKey> = new Set(
  SHOP_SORT_KEYS,
);

export const SHOP_CATEGORY_LABELS: Record<CatalogFilterCategory, string> = {
  Tous: "Tous",
  raquettes: "Raquettes",
  balles: "Balles",
  vetements: "Vêtements",
  accessoires: "Accessoires",
  goodies: "Goodies Club",
};

export const SHOP_SORT_LABELS: Record<SortKey, string> = {
  "name-asc": "Nom A-Z",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
};
