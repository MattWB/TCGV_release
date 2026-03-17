import IconCalendar from "@components/icons/IconCalendar.astro";
import IconUsers from "@components/icons/IconUsers.astro";
import IconCreditCard from "@components/icons/IconCreditCard.astro";
import IconSettings from "@components/icons/IconSettings.astro";
import IconTrophy from "@components/icons/IconTrophy.astro";
import IconMegaphone from "@components/icons/IconMegaphone.astro";
import IconKey from "@components/icons/IconKey.astro";
import IconMail from "@components/icons/IconMail.astro";

export const loginSeo = {
  title: "Espace membre - Connexion | Tennis Club du Grand Versailles",
  description:
    "Connexion à l'espace membre TCGV pour accéder aux réservations, informations de compte et services du club.",
};

export const features = [
  {
    title: "Réservation de courts",
    description:
      "Consultez les disponibilités et réservez vos terrains de tennis et de padel en quelques clics.",
    icon: IconCalendar,
    accentClass: "bg-primary/10 ring-primary/30 text-primary",
  },
  {
    title: "Gestion du compte",
    description:
      "Mettez à jour vos informations personnelles et suivez vos préférences membre.",
    icon: IconUsers,
    accentClass: "bg-club/10 ring-club/30 text-club",
  },
  {
    title: "Paiements",
    description:
      "Consultez vos échéances, factures et historiques de paiement en toute clarté.",
    icon: IconCreditCard,
    accentClass: "bg-ball/20 ring-ball/50 text-grey",
  },
  {
    title: "Tournois",
    description:
      "Inscrivez-vous aux tournois du club et suivez les résultats de vos rencontres.",
    icon: IconTrophy,
    accentClass: "bg-primary/10 ring-primary/30 text-primary",
  },
  {
    title: "Notifications",
    description:
      "Recevez les rappels importants pour vos réservations, matchs et informations club.",
    icon: IconMegaphone,
    accentClass: "bg-club/10 ring-club/30 text-club",
  },
  {
    title: "Paramètres",
    description:
      "Configurez vos options de compte, sécurité et préférences de communication.",
    icon: IconSettings,
    accentClass: "bg-grey/10 ring-grey/30 text-grey",
  },
];

export const helpItems = [
  {
    title: "Mot de passe oublié ?",
    text: "Utilisez la récupération pour recevoir un lien de réinitialisation.",
    linkLabel: "Récupérer mon mot de passe",
    href: "/contact",
    icon: IconKey,
  },
  {
    title: "Problème de connexion ?",
    text: "Notre équipe peut vous aider à débloquer votre accès rapidement.",
    linkLabel: "Voir l'aide connexion",
    href: "/contact",
    icon: IconKey,
  },
  {
    title: "Contact support",
    text: "Besoin d'un accompagnement direct ? Écrivez-nous ou appelez l'accueil.",
    linkLabel: "support@tcgv.fr",
    href: "mailto:support@tcgv.fr",
    secondaryLabel: "+33 (0)1 23 45 67 89",
    secondaryHref: "tel:+33123456789",
    icon: IconMail,
  },
];
