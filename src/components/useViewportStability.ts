import { useCallback, useLayoutEffect, useRef } from "react";

import { scrollElementIntoView } from "./islands/anchorScroll";

const MIN_CONTAINER_VISIBLE_RATIO = 0.45;
const MIN_HEIGHT_DELTA_PX = 24;

type Options = {
  watchKey: string | number;
};

export function useViewportStability<T extends HTMLElement = HTMLElement>({
  watchKey,
}: Options) {
  const containerRef = useRef<T | null>(null);
  const correctionPendingRef = useRef(false);
  const previousHeightRef = useRef<number | null>(null);

  const requestViewportStabilization = useCallback(() => {
    previousHeightRef.current =
      containerRef.current?.getBoundingClientRect().height ?? null;
    correctionPendingRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (!correctionPendingRef.current) return;
    correctionPendingRef.current = false;

    const frameId = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const minimumVisibleHeight = viewportHeight * MIN_CONTAINER_VISIBLE_RATIO;
      const previousHeight = previousHeightRef.current;
      const heightShrank =
        previousHeight === null
          ? false
          : rect.height < previousHeight - MIN_HEIGHT_DELTA_PX;

      if (rect.bottom <= 0) {
        scrollElementIntoView(container);
        return;
      }

      if (
        !heightShrank ||
        rect.top >= 0 ||
        visibleHeight >= minimumVisibleHeight
      )
        return;

      scrollElementIntoView(container);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [watchKey]);

  return { containerRef, requestViewportStabilization };
}
