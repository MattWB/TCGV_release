import IconPhone from "@components/icons/IconPhone.astro";
import IconMail from "@components/icons/IconMail.astro";
import IconMappin from "@components/icons/IconMappin.astro";
import IconClock from "@components/icons/IconClock.astro";

export const contactSeo = {
  title: "Contact - Tennis Club du Grand Versailles",
  description:
    "Contactez le Tennis Club du Grand Versailles : coordonnées, accès et formulaire de contact.",
};

export const contactDetails = [
  {
    icon: IconPhone,
    title: "Téléphone",
    content: "+33 (0)1 23 45 67 89",
    subcontent: "Accueil du club - horaires ci-dessous.",
    href: "tel:+33123456789",
    hrefLabel: "Appeler le club",
  },
  {
    icon: IconMail,
    title: "Email",
    content: "contact@tcgv.fr",
    subcontent: "Réponse selon disponibilité de l'équipe.",
    href: "mailto:contact@tcgv.fr",
    hrefLabel: "Envoyer un email au club",
  },
  {
    icon: IconMappin,
    title: "Adresse",
    content: "Tennis Club du Grand Versailles",
    subcontent: "57 Rue Rémont - 78000 Versailles",
    href: "https://maps.google.com/?q=Tennis+Club+du+Grand+Versailles",
    hrefLabel: "Ouvrir la localisation du club sur Google Maps",
  },
  {
    icon: IconClock,
    title: "Horaires",
    content: "Du lundi au dimanche",
    subcontent:
      "Courts : 7h30 à 22h30 - Secrétariat (du mardi au samedi) : 9h à 18h",
  },
];

export const accessInfo = [
  {
    title: "Métro",
    detail: "Ligne et station (à venir)",
  },
  {
    title: "Bus",
    detail: "Lignes de bus (à venir)",
  },
  {
    title: "Parking",
    detail: "Stationnement à proximité (à venir)",
  },
];

export const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.4868118071417!2d2.156093513970702!3d48.79168687770375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67c3da15eb085%3A0xdba275710dffeb4c!2s57%20Rue%20R%C3%A9mont%2C%2078000%20Versailles!5e0!3m2!1sfr!2sfr!4v1770830627919!5m2!1sfr!2sfr";
