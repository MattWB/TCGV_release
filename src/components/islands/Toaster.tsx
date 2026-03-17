import { useEffect, useRef, useState } from "react";

// PROPS
type ToastVariant = "success" | "info" | "warning" | "error";
type ToastDisplayVariant = "success" | "info" | "error";
type ToastPhase = "entering" | "active" | "closing";

type ToastEventDetail = {
  title?: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = {
  id: string;
  title: string;
  message: string;
  variant: ToastDisplayVariant;
  duration: number;
  phase: ToastPhase;
};

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 8000;
const EXIT_TRANSITION_MS = 240;
const ENTER_TRANSITION_DELAY_MS = 16;

const VARIANT_BORDER_LEFT: Record<ToastDisplayVariant, string> = {
  success: "var(--color-club)",
  info: "var(--color-ball)",
  error: "#dc2626",
};

const getToastId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizeVariant = (variant?: ToastVariant): ToastDisplayVariant => {
  if (variant === "success" || variant === "error") return variant;
  return "info";
};

/* ICONS */

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const IconError = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    />
  </svg>
);

const IconInformation = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

const IconXCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ToastIcon = ({ variant }: { variant: ToastDisplayVariant }) => {
  if (variant === "success") return <IconCheck />;
  if (variant === "error") return <IconError />;
  return <IconInformation />;
};

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // AUTO CLOSING, ACTIVE CLOSING
  const autoCloseTimersRef = useRef<Map<string, number>>(new Map());
  const removeTimersRef = useRef<Map<string, number>>(new Map());
  const enterTimersRef = useRef<Map<string, number>>(new Map());

  const clearTimers = (id: string) => {
    const t1 = autoCloseTimersRef.current.get(id);
    if (typeof t1 === "number") window.clearTimeout(t1);
    autoCloseTimersRef.current.delete(id);

    const t2 = removeTimersRef.current.get(id);
    if (typeof t2 === "number") window.clearTimeout(t2);
    removeTimersRef.current.delete(id);

    const t3 = enterTimersRef.current.get(id);
    if (typeof t3 === "number") window.clearTimeout(t3);
    enterTimersRef.current.delete(id);
  };

  const removeToastNow = (id: string) => {
    clearTimers(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const startClose = (id: string) => {
    // PREVENT DUPLICATE CLOSER
    setToasts((prev) =>
      prev.map((t) =>
        t.id === id && t.phase !== "closing" ? { ...t, phase: "closing" } : t,
      ),
    );
  };

  // REMOVE CLOSING TIMER
  useEffect(() => {
    toasts.forEach((t) => {
      if (t.phase !== "closing") return;
      if (removeTimersRef.current.has(t.id)) return;

      const timeoutId = window.setTimeout(() => {
        removeToastNow(t.id);
      }, EXIT_TRANSITION_MS);

      removeTimersRef.current.set(t.id, timeoutId);
    });

    // TIMERS CLEANUP
    const activeIds = new Set(toasts.map((t) => t.id));
    autoCloseTimersRef.current.forEach((timeoutId, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(timeoutId);
        autoCloseTimersRef.current.delete(id);
      }
    });
    removeTimersRef.current.forEach((timeoutId, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(timeoutId);
        removeTimersRef.current.delete(id);
      }
    });
  }, [toasts]);

  useEffect(() => {
    const onToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      const detail = customEvent.detail ?? {};
      const message = String(detail.message ?? "").trim();
      const title = String(detail.title ?? "Notification").trim();

      if (!message) return;

      const duration =
        typeof detail.duration === "number" && detail.duration > 0
          ? detail.duration
          : DEFAULT_DURATION;

      const id = getToastId();
      const newToast: ToastItem = {
        id,
        title,
        message,
        variant: normalizeVariant(detail.variant),
        duration,
        phase: "entering",
      };

      // ADD TOAST -> MAX TOASTS
      setToasts((prev) => {
        const next = [...prev, newToast];
        return next.length > MAX_TOASTS
          ? next.slice(next.length - MAX_TOASTS)
          : next;
      });

      // ACTIVE TRANSITION
      // Delay one frame so the entering transform is painted before switching to active.
      const enterTimeoutId = window.setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) =>
            t.id === id && t.phase === "entering"
              ? { ...t, phase: "active" }
              : t,
          ),
        );
        enterTimersRef.current.delete(id);
      }, ENTER_TRANSITION_DELAY_MS);
      enterTimersRef.current.set(id, enterTimeoutId);

      // SCHEDULED AUTO CLOSE
      const timeoutId = window.setTimeout(() => startClose(id), duration);
      autoCloseTimersRef.current.set(id, timeoutId);
    };

    window.addEventListener("tcgv:toast", onToastEvent as EventListener);

    return () => {
      window.removeEventListener("tcgv:toast", onToastEvent as EventListener);

      autoCloseTimersRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      autoCloseTimersRef.current.clear();

      removeTimersRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      removeTimersRef.current.clear();

      enterTimersRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      enterTimersRef.current.clear();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-3 z-[70] w-[min(24rem,calc(100vw-1.5rem))] sm:right-4 sm:w-[min(24rem,calc(100vw-2rem))]"
      style={{ top: "calc(var(--header-h, 64px) + 1rem)" }}
      aria-hidden={toasts.length === 0}
    >
      <ul className="flex flex-col items-end gap-3">
        {toasts.map((toast) => {
          const isShifted =
            toast.phase === "entering" || toast.phase === "closing";
          const role = toast.variant === "error" ? "alert" : "status";
          const ariaLive = toast.variant === "error" ? "assertive" : "polite";

          const iconColorClass =
            toast.variant === "success"
              ? "text-club"
              : toast.variant === "error"
                ? "text-red-600"
                : "text-ball";

          return (
            <li key={toast.id} className="pointer-events-auto w-full">
              <article
                className={`w-full max-w-sm overflow-hidden rounded-xl border border-clubblack/10 border-l-4 bg-clubwhite shadow-lg transition-transform duration-[240ms] ease-out ${
                  isShifted
                    ? "translate-x-[calc(100%+1.5rem)]"
                    : "translate-x-0"
                }`}
                style={{ borderLeftColor: VARIANT_BORDER_LEFT[toast.variant] }}
                role={role}
                aria-live={ariaLive}
                aria-atomic="true"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center ${iconColorClass}`}
                      aria-hidden="true"
                    >
                      <ToastIcon variant={toast.variant} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold tracking-tight text-clubblack">
                        {toast.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {toast.message}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="tcgv-focus inline-flex size-7 shrink-0 items-center justify-center rounded-full text-clubblack/70 hover:bg-clubblack/5"
                      onClick={() => startClose(toast.id)}
                      aria-label="Fermer la notification"
                    >
                      <IconXCircle />
                    </button>
                  </div>
                </div>

                <div className="h-1 w-full bg-clubblack/12" aria-hidden="true">
                  <div
                    className="h-full w-full origin-right bg-clubblack/35"
                    style={{
                      animation: `tcgv-toast-progress ${toast.duration}ms linear forwards`,
                    }}
                  />
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* TIMER STYLE */}
      <style>{`
        @keyframes tcgv-toast-progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
