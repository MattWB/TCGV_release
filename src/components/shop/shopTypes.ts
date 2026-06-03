import type { ProductCategory, ShopItem } from "../../data/shopItems";

export type { ProductCategory };

export type CatalogFilterCategory = "Tous" | ProductCategory;

export type ResponsiveShopImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type ShopItemClient = Omit<ShopItem, "imageSrc"> & {
  image: ResponsiveShopImage;
};
