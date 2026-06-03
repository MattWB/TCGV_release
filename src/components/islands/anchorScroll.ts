export function getAnchorScrollBehavior(): ScrollBehavior {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "auto";
  }
  return "smooth";
}

export function scrollElementIntoView(
  element: Element,
  options: ScrollIntoViewOptions = {},
): void {
  element.scrollIntoView({
    behavior: getAnchorScrollBehavior(),
    block: "start",
    ...options,
  });
}

export function scrollToAnchorById(anchorId: string): void {
  const anchor = document.getElementById(anchorId);
  if (!anchor) return;
  scrollElementIntoView(anchor);
}
