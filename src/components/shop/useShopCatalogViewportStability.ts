import { useCallback, useLayoutEffect, useRef } from "react";

import { scrollElementIntoView } from "../islands/anchorScroll";

const MIN_CATALOG_VISIBLE_RATIO = 0.45;
const MIN_HEIGHT_DELTA_PX = 24;

type Options = {
  watchKey: string | number;
};

export function useShopCatalogViewportStability({ watchKey }: Options) {
  const catalogRef = useRef<HTMLElement | null>(null);
  const correctionPendingRef = useRef(false);
  const previousHeightRef = useRef<number | null>(null);

  const requestViewportStabilization = useCallback(() => {
    previousHeightRef.current =
      catalogRef.current?.getBoundingClientRect().height ?? null;
    correctionPendingRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (!correctionPendingRef.current) return;
    correctionPendingRef.current = false;

    const frameId = window.requestAnimationFrame(() => {
      const catalog = catalogRef.current;
      if (!catalog) return;

      const rect = catalog.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const minimumVisibleHeight = viewportHeight * MIN_CATALOG_VISIBLE_RATIO;
      const previousHeight = previousHeightRef.current;
      const heightShrank =
        previousHeight === null
          ? false
          : rect.height < previousHeight - MIN_HEIGHT_DELTA_PX;

      if (rect.bottom <= 0) {
        scrollElementIntoView(catalog);
        return;
      }

      if (
        !heightShrank ||
        rect.top >= 0 ||
        visibleHeight >= minimumVisibleHeight
      )
        return;

      scrollElementIntoView(catalog);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [watchKey]);

  return { catalogRef, requestViewportStabilization };
}
