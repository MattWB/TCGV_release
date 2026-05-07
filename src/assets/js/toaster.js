const DATA_TOAST_MESSAGES = Object.freeze({
  pdf: {
    title: "Document",
    message: "Le règlement en PDF sera bientôt disponible.",
    variant: "info",
  },
  news: {
    title: "Actualites",
    message: "Les articles complets seront bientôt disponibles.",
    variant: "info",
  },
  login: {
    title: "Connexion",
    message: "Cette fonctionnalité arrive bientôt.",
    variant: "info",
  },
});

const TOAST_ROOT_ID = "tcgv-toast-root";
const TOAST_LIST_ID = "tcgv-toast-list";
const TOAST_STYLE_ID = "tcgv-toast-style";
const TOAST_EVENT_NAME = "tcgv:toast";
const TOAST_RENDER_EVENT_NAME = "tcgv:toast:render";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DEFAULT_TITLE = "Notification";
const DEFAULT_VARIANT = "info";
const DEFAULT_DURATION = 8000;
const MAX_TOASTS = 3;
const EXIT_TRANSITION_MS = 240;
const ENTER_TRANSITION_DELAY_MS = 16;
const VALID_VARIANTS = new Set(["success", "info", "warning", "error"]);
const TOAST_CLASS_NAMES = Object.freeze({
  root: "pointer-events-none fixed right-3 z-[70] w-[min(24rem,calc(100vw-1.5rem))] sm:right-4 sm:w-[min(24rem,calc(100vw-2rem))]",
  list: "flex flex-col items-end gap-3",
  item: "pointer-events-auto w-full",
  article:
    "w-full max-w-sm overflow-hidden rounded-xl border border-clubblack/10 border-l-4 bg-clubwhite shadow-lg transition-transform duration-[240ms] ease-out",
  closeButton:
    "tcgv-focus inline-flex size-7 shrink-0 items-center justify-center rounded-full text-clubblack/70 hover:bg-clubblack/5",
  icon: "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center",
  progressTrack: "h-1 w-full bg-clubblack/12",
  progressBar: "h-full w-full origin-right bg-clubblack/35",
  shifted: "translate-x-[calc(100%+1.5rem)]",
  visible: "translate-x-0",
});
const VARIANT_BORDER_LEFT = Object.freeze({
  success: "var(--color-club)",
  info: "var(--color-ball)",
  warning: "#d97706",
  error: "#dc2626",
});
const VARIANT_ICON_CLASS = Object.freeze({
  success: "text-club",
  info: "text-ball",
  warning: "text-amber-600",
  error: "text-red-600",
});
const ICON_PATHS = Object.freeze({
  success: ["m4.5 12.75 6 6 9-13.5"],
  info: [
    "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021",
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  ],
  warning: [
    "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  ],
  error: [
    "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  ],
  close: [
    "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5",
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  ],
});

const activeToasts = new Map();
const autoCloseTimers = new Map();
const removeTimers = new Map();
const enterTimers = new Map();

function getDataToastMessage(key) {
  if (!key) return null;
  if (!Object.prototype.hasOwnProperty.call(DATA_TOAST_MESSAGES, key)) {
    return null;
  }
  return DATA_TOAST_MESSAGES[key];
}

function normalizeToastDetail(detail = {}) {
  const message = String(detail.message ?? "").trim();
  if (!message) return null;

  const title = String(detail.title ?? DEFAULT_TITLE).trim() || DEFAULT_TITLE;
  const variant = VALID_VARIANTS.has(detail.variant)
    ? detail.variant
    : DEFAULT_VARIANT;
  const duration =
    typeof detail.duration === "number" && detail.duration > 0
      ? detail.duration
      : DEFAULT_DURATION;

  return { title, message, variant, duration };
}

function getToastRoot() {
  return document.getElementById(TOAST_ROOT_ID);
}

function ensureToastRoot() {
  const existingRoot = getToastRoot();
  if (existingRoot) return existingRoot;

  const root = document.createElement("div");
  root.id = TOAST_ROOT_ID;
  root.className = TOAST_CLASS_NAMES.root;
  root.style.top = "calc(var(--header-h, 64px) + 1rem)";
  root.setAttribute("aria-live", "polite");
  root.setAttribute("aria-atomic", "false");
  root.dataset.tcgvToastRoot = "true";

  const list = document.createElement("ul");
  list.id = TOAST_LIST_ID;
  list.className = TOAST_CLASS_NAMES.list;
  root.appendChild(list);

  document.body.appendChild(root);
  return root;
}

function ensureToastStyle() {
  if (document.getElementById(TOAST_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = TOAST_STYLE_ID;
  style.textContent = `
[data-tcgv-toast-root="true"] {
  pointer-events: none;
  position: fixed;
  right: 0.75rem;
  z-index: 70;
  width: min(24rem, calc(100vw - 1.5rem));
}

@media (min-width: 640px) {
  [data-tcgv-toast-root="true"] {
    right: 1rem;
    width: min(24rem, calc(100vw - 2rem));
  }
}

#${TOAST_LIST_ID} {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

[data-toast-id] {
  pointer-events: auto;
  width: 100%;
}

[data-toast-article] {
  width: 100%;
  max-width: 24rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--color-clubblack, #111827) 10%, transparent);
  border-left-width: 4px;
  border-radius: 0.75rem;
  background: var(--color-clubwhite, #ffffff);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transform: translateX(calc(100% + 1.5rem));
  transition: transform 240ms ease-out;
}

[data-toast-article][data-visible="true"] {
  transform: translateX(0);
}

[data-toast-body] {
  padding: 1rem;
}

[data-toast-row] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

[data-toast-icon] {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

[data-toast-text] {
  min-width: 0;
  flex: 1;
}

[data-toast-title] {
  margin: 0;
  color: var(--color-clubblack, #111827);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

[data-toast-message] {
  margin: 0.25rem 0 0;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

[data-toast-close] {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  color: color-mix(in oklab, var(--color-clubblack, #111827) 70%, transparent);
  cursor: pointer;
}

[data-toast-close]:hover {
  background: color-mix(in oklab, var(--color-clubblack, #111827) 5%, transparent);
}

[data-toast-progress-track] {
  width: 100%;
  height: 0.25rem;
  background: color-mix(in oklab, var(--color-clubblack, #111827) 12%, transparent);
}

[data-toast-progress-bar] {
  width: 100%;
  height: 100%;
  transform-origin: right;
  background: color-mix(in oklab, var(--color-clubblack, #111827) 35%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  [data-toast-article] {
    transform: none;
    transition: none;
  }

  [data-toast-progress-bar] {
    animation: none !important;
  }
}

@keyframes tcgv-toast-progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
`;
  document.head.appendChild(style);
}

function getToastList() {
  return document.getElementById(TOAST_LIST_ID);
}

function getToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function prefersReducedMotion() {
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches === true;
}

function createSvgIcon(paths, className = "size-6") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("class", className);

  paths.forEach((pathValue) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", pathValue);
    svg.appendChild(path);
  });

  return svg;
}

function clearToastTimers(id) {
  const autoCloseTimer = autoCloseTimers.get(id);
  if (typeof autoCloseTimer === "number") window.clearTimeout(autoCloseTimer);
  autoCloseTimers.delete(id);

  const removeTimer = removeTimers.get(id);
  if (typeof removeTimer === "number") window.clearTimeout(removeTimer);
  removeTimers.delete(id);

  const enterTimer = enterTimers.get(id);
  if (typeof enterTimer === "number") window.clearTimeout(enterTimer);
  enterTimers.delete(id);
}

function removeToastNow(id) {
  const item = activeToasts.get(id);
  if (!item) return;

  clearToastTimers(id);
  item.remove();
  activeToasts.delete(id);
}

function closeToast(id) {
  const item = activeToasts.get(id);
  if (!item || item.dataset.phase === "closing") return;

  item.dataset.phase = "closing";
  const article = item.querySelector("[data-toast-article]");
  delete article?.dataset.visible;
  article?.classList.remove(TOAST_CLASS_NAMES.visible);
  article?.classList.add(TOAST_CLASS_NAMES.shifted);

  const removeDelay = prefersReducedMotion() ? 0 : EXIT_TRANSITION_MS;
  const removeTimer = window.setTimeout(() => {
    removeToastNow(id);
  }, removeDelay);
  removeTimers.set(id, removeTimer);
}

function trimToastQueue() {
  while (activeToasts.size > MAX_TOASTS) {
    const oldestId = activeToasts.keys().next().value;
    if (!oldestId) return;
    removeToastNow(oldestId);
  }
}

function createToastElement({ id, title, message, variant, duration }) {
  const item = document.createElement("li");
  item.className = TOAST_CLASS_NAMES.item;
  item.dataset.toastId = id;
  item.dataset.phase = "entering";

  const article = document.createElement("article");
  article.className = `${TOAST_CLASS_NAMES.article} ${TOAST_CLASS_NAMES.shifted}`;
  article.style.borderLeftColor = VARIANT_BORDER_LEFT[variant];
  article.setAttribute("role", variant === "error" ? "alert" : "status");
  article.setAttribute(
    "aria-live",
    variant === "error" ? "assertive" : "polite",
  );
  article.setAttribute("aria-atomic", "true");
  article.dataset.toastArticle = "true";

  const body = document.createElement("div");
  body.className = "p-4";
  body.dataset.toastBody = "true";

  const row = document.createElement("div");
  row.className = "flex items-start gap-3";
  row.dataset.toastRow = "true";

  const icon = document.createElement("span");
  icon.className = `${TOAST_CLASS_NAMES.icon} ${VARIANT_ICON_CLASS[variant]}`;
  icon.setAttribute("aria-hidden", "true");
  icon.dataset.toastIcon = "true";
  icon.appendChild(
    createSvgIcon(
      ICON_PATHS[variant],
      variant === "success" ? "size-5" : "size-6",
    ),
  );

  const text = document.createElement("div");
  text.className = "min-w-0 flex-1";
  text.dataset.toastText = "true";

  const titleElement = document.createElement("p");
  titleElement.className =
    "text-sm font-semibold tracking-tight text-clubblack";
  titleElement.dataset.toastTitle = "true";
  titleElement.textContent = title;

  const messageElement = document.createElement("p");
  messageElement.className = "mt-1 text-sm text-gray-600";
  messageElement.dataset.toastMessage = "true";
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = TOAST_CLASS_NAMES.closeButton;
  closeButton.dataset.toastClose = "true";
  closeButton.setAttribute("aria-label", "Fermer la notification");
  closeButton.appendChild(createSvgIcon(ICON_PATHS.close));
  closeButton.addEventListener("click", () => closeToast(id));

  const progressTrack = document.createElement("div");
  progressTrack.className = TOAST_CLASS_NAMES.progressTrack;
  progressTrack.dataset.toastProgressTrack = "true";
  progressTrack.setAttribute("aria-hidden", "true");

  const progressBar = document.createElement("div");
  progressBar.className = TOAST_CLASS_NAMES.progressBar;
  progressBar.dataset.toastProgressBar = "true";
  if (!prefersReducedMotion()) {
    progressBar.style.animation = `tcgv-toast-progress ${duration}ms linear forwards`;
  }

  text.append(titleElement, messageElement);
  row.append(icon, text, closeButton);
  body.appendChild(row);
  progressTrack.appendChild(progressBar);
  article.append(body, progressTrack);
  item.appendChild(article);

  return item;
}

function addToast(detail) {
  const list = getToastList();
  if (!list) return;

  const id = getToastId();
  const toast = createToastElement({ id, ...detail });
  activeToasts.set(id, toast);
  list.appendChild(toast);
  trimToastQueue();

  const activateToast = () => {
    const article = toast.querySelector("[data-toast-article]");
    toast.dataset.phase = "active";
    if (article) article.dataset.visible = "true";
    article?.classList.remove(TOAST_CLASS_NAMES.shifted);
    article?.classList.add(TOAST_CLASS_NAMES.visible);
    enterTimers.delete(id);
  };

  if (prefersReducedMotion()) {
    activateToast();
  } else {
    const enterTimer = window.setTimeout(
      activateToast,
      ENTER_TRANSITION_DELAY_MS,
    );
    enterTimers.set(id, enterTimer);
  }

  const autoCloseTimer = window.setTimeout(() => {
    closeToast(id);
  }, detail.duration);
  autoCloseTimers.set(id, autoCloseTimer);
}

function renderToast(detail) {
  const root = getToastRoot();
  if (!root) return;

  root.dispatchEvent(
    new CustomEvent(TOAST_RENDER_EVENT_NAME, {
      detail,
    }),
  );
}

function handleToastRenderEvent(event) {
  addToast(event.detail);
}

function handleToastEvent(event) {
  const detail = normalizeToastDetail(event.detail);
  if (!detail) return;

  renderToast(detail);
}

function showToast({
  title = DEFAULT_TITLE,
  message,
  variant = DEFAULT_VARIANT,
  duration,
}) {
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT_NAME, {
      detail: {
        title,
        message,
        variant,
        duration,
      },
    }),
  );
}

const toastRoot = ensureToastRoot();
ensureToastStyle();
toastRoot.addEventListener(TOAST_RENDER_EVENT_NAME, handleToastRenderEvent);
window.addEventListener(TOAST_EVENT_NAME, handleToastEvent);

document.addEventListener("click", (e) => {
  const target = e.target?.closest?.("[data-toast]");
  if (!target) return;

  const key = target.getAttribute("data-toast");
  const config = getDataToastMessage(key);
  if (!config) return;

  showToast(config);
});
