// -------------------------------------------------------
// TCGV Reveal — IntersectionObserver (Astro-first)
// - One-shot reveal (unobserve after visible)
// - No-JS safe: only hides when html.js exists
// - Reduced motion respected
// - Stable even for "above the fold" elements (keeps transition)
// -------------------------------------------------------

(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMq.matches) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const all = Array.from(document.querySelectorAll(".reveal"));
  if (all.length === 0) return;

  // Skip opt-out reveals (if you use reveal--none)
  const elements = all.filter((el) => !el.classList.contains("reveal--none"));
  if (elements.length === 0) return;

  // Fallback if IO isn't supported
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const DEFAULT_THRESHOLD = 0.12;
  const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const parseThreshold = (v) => {
    if (v == null || v === "") return DEFAULT_THRESHOLD;
    const n = Number(v);
    if (Number.isNaN(n)) return DEFAULT_THRESHOLD;
    return clamp(n, 0.05, 0.35);
  };

  const parseMargin = (v) => {
    // Keep it simple: if user provides garbage, fallback
    if (typeof v !== "string" || v.trim() === "") return DEFAULT_ROOT_MARGIN;
    return v.trim();
  };

  // Ensure transitions also run for elements visible on load
  const revealWithTransition = (el) => {
    // If already visible, no-op
    if (el.classList.contains("is-visible")) return;

    // Force at least one paint with initial hidden styles before revealing
    // This avoids "instant reveal" on some browsers / fast hydration
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("is-visible");
      });
    });
  };

  const observers = new Map();

  const getObserver = (threshold, rootMargin) => {
    const key = `${threshold}|${rootMargin}`;
    if (observers.has(key)) return observers.get(key);

    const obs = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;

          revealWithTransition(el);
          observer.unobserve(el); // one-shot
        }
      },
      { threshold, rootMargin },
    );

    observers.set(key, obs);
    return obs;
  };

  // Observe everything, but reveal immediately (WITH transition) if already in view.
  // "Already in view" check is strict to avoid revealing too much on load.
  const isInInitialViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Strict: element top within viewport AND not far below fold
    return rect.top >= 0 && rect.top < vh * 0.85;
  };

  for (const el of elements) {
    const t = parseThreshold(el.dataset.revealThreshold);
    const m = parseMargin(el.dataset.revealMargin);

    const obs = getObserver(t, m);
    obs.observe(el);

    if (isInInitialViewport(el)) {
      // Reveal immediately but keep the animation
      revealWithTransition(el);
      obs.unobserve(el); // still one-shot
    }
  }
})();
