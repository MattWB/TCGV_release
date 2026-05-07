type ToastVariant = "success" | "info" | "warning" | "error";

/**
 * Global notification contract.
 *
 * Consumers listen to the browser event `tcgv:toast`.
 * Producers can dispatch it from Astro inline scripts, vanilla JS modules,
 * React islands, or this helper.
 *
 * Event detail:
 * - `message` is required and should contain the visible notification body.
 * - `title` is optional and falls back to "Notification".
 * - `variant` is optional, accepts "success" | "info" | "warning" | "error",
 *   and falls back to "info".
 * - `duration` is optional and lets the renderer override its default timeout.
 *
 * The event contract is framework-agnostic. Rendering can be implemented by
 * React or vanilla JS as long as the same `CustomEvent` payload is accepted.
 */
export function showToast({
  title = "Notification",
  message,
  variant = "info",
  duration,
}: {
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}) {
  window.dispatchEvent(
    new CustomEvent("tcgv:toast", {
      detail: {
        title,
        message,
        variant,
        duration,
      },
    }),
  );
}
