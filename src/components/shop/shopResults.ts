import type { SortKey } from "./shopUrlState";
import { normalizeSearchText } from "./shopUrlState";

export function getFilteredSortedItems<
  T extends {
    name: string;
    description: string;
    category: string;
    tags?: string[];
    priceCents: number;
  },
>(
  items: T[],
  category: string,
  defaultCategory: string,
  query: string,
  sort: SortKey,
): T[] {
  const normalizedQuery = normalizeSearchText(query);

  const filtered = items.filter((item) => {
    if (category !== defaultCategory && item.category !== category)
      return false;
    if (!normalizedQuery) return true;

    const haystack = normalizeSearchText(
      [item.name, item.description, ...(item.tags ?? [])].join(" "),
    );
    return haystack.includes(normalizedQuery);
  });

  const withIndex = filtered.map((item, index) => ({ item, index }));
  withIndex.sort((a, b) => {
    if (sort === "name-asc") {
      const cmp = a.item.name.localeCompare(b.item.name, "fr", {
        sensitivity: "base",
      });
      return cmp !== 0 ? cmp : a.index - b.index;
    }
    if (sort === "price-asc") {
      const cmp = a.item.priceCents - b.item.priceCents;
      return cmp !== 0 ? cmp : a.index - b.index;
    }
    const cmp = b.item.priceCents - a.item.priceCents;
    return cmp !== 0 ? cmp : a.index - b.index;
  });

  return withIndex.map((e) => e.item);
}
