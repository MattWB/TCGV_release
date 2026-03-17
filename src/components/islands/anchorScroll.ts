export function getAnchorScrollBehavior(): ScrollBehavior {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "auto";
  }
  return "smooth";
}

export function scrollToAnchorById(anchorId: string): void {
  const anchor = document.getElementById(anchorId);
  if (!anchor) return;
  anchor.scrollIntoView({
    behavior: getAnchorScrollBehavior(),
    block: "start",
  });
}
