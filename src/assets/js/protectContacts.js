// SCRIPT PROTECTIONS DONNEES CONTACT

function toHtmlEntities(str) {
  return str
    .replaceAll(".", "&#46;")
    .replaceAll("@", "&#64;")
    .replaceAll(" ", "&nbsp;");
}

export function mountProtectedContacts(root = document, opts = {}) {
  const { nofollow = true } = opts;

  // PREVENT MULTI LAUNCHING
  if (root.__contactsMounted) return;
  root.__contactsMounted = true;

  // MAIL
  root.querySelectorAll("[data-mail-user][data-mail-domain]").forEach((el) => {
    if (el.dataset.mounted === "true") return;
    const user = el.getAttribute("data-mail-user");
    const domain = el.getAttribute("data-mail-domain");
    if (!user || !domain) return;
    const addr = `${user}@${domain}`;

    const a = document.createElement("a");
    a.href = `mailto:${addr}`;

    if (nofollow) a.rel = "nofollow";
    a.textContent = addr;

    if (el.dataset.class) a.className = el.dataset.class;

    if (el.getAttribute("aria-label"))
      a.setAttribute("aria-label", el.getAttribute("aria-label"));

    el.replaceWith(a);
  });

  // TEL
  root.querySelectorAll("[data-tel-cc][data-tel-national]").forEach((el) => {
    if (el.dataset.mounted === "true") return;
    const cc = el.getAttribute("data-tel-cc"); // ex: +33
    const nat = el.getAttribute("data-tel-national"); // ex: 123456789

    if (!cc || !nat) return;

    const a = document.createElement("a");
    a.href = `tel:${cc}${nat}`; // E.164
    if (nofollow) a.rel = "nofollow";

    // DISPLAY data-tel-display
    const display = el.getAttribute("data-tel-display") || `${cc} ${nat}`;
    // INCLUDE NBSP
    a.innerHTML = toHtmlEntities(display);

    if (el.dataset.class) a.className = el.dataset.class;
    if (el.getAttribute("aria-label"))
      a.setAttribute("aria-label", el.getAttribute("aria-label"));

    el.replaceWith(a);
  });
}

// AUTO-MOUNT
// FORCE STARTUP
if (typeof window !== "undefined") {
  const run = () =>
    (window.requestIdleCallback || window.setTimeout)(() =>
      mountProtectedContacts(),
    );
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
}
