type ToastVariant = "success" | "info" | "warning" | "error";

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
