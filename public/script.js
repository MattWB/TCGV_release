// =======================================================
// TCGV — Header / Navigation (mobile drawer + submenus)
// Refactor: no inline onclick, no window.toggleSublist
// =======================================================

(() => {
  // ----- Selectors
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu"); // drawer container
  const overlay = document.getElementById("menuOverlay");
  const siteHeader = document.getElementById("siteHeader");
  const html = document.documentElement;

  if (!hamburgerBtn || !navMenu) return;

  // Match your breakpoint (lg = 1024px)
  const desktopMq = window.matchMedia("(min-width: 1024px)");

  // ----- State
  const state = {
    menuOpen: false,
    openSubmenuBtn: null, // accordion behavior on mobile
  };

  // ----- Utils
  const isDesktop = () => desktopMq.matches;

  const getToggleButtons = () =>
    navMenu.querySelectorAll('button[aria-haspopup="true"]');

  const getSublistForBtn = (btn) => {
    const sub = btn?.nextElementSibling;
    return sub && sub.classList.contains("subList") ? sub : null;
  };

  const closeSubmenu = (btn) => {
    const sub = getSublistForBtn(btn);
    if (!btn || !sub) return;

    btn.setAttribute("aria-expanded", "false");
    sub.style.maxHeight = "0px";

    if (state.openSubmenuBtn === btn) state.openSubmenuBtn = null;
  };

  const openSubmenu = (btn) => {
    const sub = getSublistForBtn(btn);
    if (!btn || !sub) return;

    btn.setAttribute("aria-expanded", "true");
    // Recompute scrollHeight each time (fonts load, responsive changes, etc.)
    sub.style.maxHeight = `${sub.scrollHeight}px`;

    state.openSubmenuBtn = btn;
  };

  const closeAllSubmenus = () => {
    getToggleButtons().forEach((btn) => closeSubmenu(btn));
  };

  // Keep open submenu height correct on resize / font swap
  const refreshOpenSubmenuHeight = () => {
    const btn = state.openSubmenuBtn;
    if (!btn) return;
    const sub = getSublistForBtn(btn);
    if (!sub) return;
    if (btn.getAttribute("aria-expanded") === "true") {
      sub.style.maxHeight = `${sub.scrollHeight}px`;
    }
  };

  // ----- Menu open/close (drawer)
  const setMenuOpen = (open) => {
    // Desktop: drawer should behave as normal bar; no overlay/scroll-lock
    if (isDesktop()) open = false;

    state.menuOpen = open;

    hamburgerBtn.classList.toggle("open", open);
    hamburgerBtn.setAttribute("aria-expanded", String(open));
    hamburgerBtn.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu"
    );

    // Drawer transform only matters on mobile
    navMenu.classList.toggle("-translate-x-full", !open);
    navMenu.classList.toggle("translate-x-0", open);

    // Scroll lock on mobile only
    html.classList.toggle("overflow-hidden", open);

    // Overlay
    if (overlay) {
      overlay.classList.toggle("opacity-0", !open);
      overlay.classList.toggle("pointer-events-none", !open);
      overlay.classList.toggle("opacity-100", open);
      overlay.classList.toggle("pointer-events-auto", open);

      overlay.tabIndex = open ? 0 : -1;
    }

    // When closing, also close submenus (mobile UX)
    if (!open) closeAllSubmenus();
  };

  const toggleMenu = () => setMenuOpen(!state.menuOpen);

  // ----- Events: hamburger
  hamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!state.menuOpen) closeAllSubmenus();
    toggleMenu();
  });

  // ----- Events: overlay click closes
  overlay?.addEventListener("click", (e) => {
    e.preventDefault();
    setMenuOpen(false);
    hamburgerBtn.focus?.();
  });

  // ----- Events: Escape closes menu (and submenus)
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (state.openSubmenuBtn) {
      closeSubmenu(state.openSubmenuBtn);
      return;
    }

    if (!state.menuOpen) return;
    setMenuOpen(false);
    hamburgerBtn.focus?.();
  });

  // ----- Events: submenus (event delegation)
  navMenu.addEventListener("click", (e) => {
    if (isDesktop()) return; // desktop dropdown is CSS hover/focus only

    const btn = e.target.closest('button[aria-haspopup="true"]');
    if (!btn || !navMenu.contains(btn)) return;

    e.preventDefault();

    const isOpen = btn.getAttribute("aria-expanded") === "true";

    getToggleButtons().forEach((otherBtn) => {
      if (otherBtn !== btn) closeSubmenu(otherBtn);
    });

    if (isOpen) closeSubmenu(btn);
    else openSubmenu(btn);
  });

  // Optional: clicking any nav link on mobile closes the drawer
  navMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link || !navMenu.contains(link)) return;
    if (isDesktop()) return;
    setMenuOpen(false);
  });

  // ----- Breakpoint sync
  const syncOnBreakpoint = () => {
    if (isDesktop()) {
      // Desktop: never keep mobile drawer states
      setMenuOpen(false);

      // Reset any mobile accordion states
      closeAllSubmenus();
      getToggleButtons().forEach((btn) => btn.setAttribute("aria-expanded", "false"));

      // Ensure desktop layout isn't polluted
      navMenu.classList.remove("translate-x-0", "-translate-x-full");
      hamburgerBtn.classList.remove("open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "Ouvrir le menu");
    } else {
      // Mobile: start closed
      setMenuOpen(false);
    }

    refreshOpenSubmenuHeight();
  };


  desktopMq.addEventListener("change", syncOnBreakpoint);

  // ----- Sticky header visual state
  if (siteHeader) {
    const updateHeaderOnScroll = () => {
      siteHeader.classList.toggle("header-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();
  }

  // ----- Resize safety
  window.addEventListener("resize", () => {
    refreshOpenSubmenuHeight();
  });

  // ----- Init
  syncOnBreakpoint();
})();
