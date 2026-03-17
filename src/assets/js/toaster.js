const TOAST_MESSAGES = {
  pdf: {
    title: "Document",
    message: "Le reglement en PDF sera bientot disponible.",
    variant: "info",
  },
  news: {
    title: "Actualites",
    message: "Les articles complets seront bientot disponibles.",
    variant: "info",
  },
  login: {
    title: "Connexion",
    message: "Cette fonctionnalite arrive bientot.",
    variant: "info",
  },
};

function showToast({ title = "Notification", message, variant = "info", duration }) {
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

document.addEventListener("click", (e) => {
  const target = e.target?.closest?.("[data-toast]");
  if (!target) return;

  const key = target.getAttribute("data-toast");
  const config = TOAST_MESSAGES[key];
  if (!config) return;

  showToast(config);
});
