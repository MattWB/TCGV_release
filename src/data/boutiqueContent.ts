import IconUsers from "@components/icons/IconUsers.astro";
import IconTennisRacket from "@components/icons/IconTennisRacket.astro";
import IconTennisBall from "@components/icons/IconTennisBall.astro";
import IconDress from "@components/icons/IconDress.astro";
import IconVisor from "@components/icons/IconVisor.astro";
import IconClub from "@components/icons/IconClub.astro";
import IconParcel from "@components/icons/IconParcel.astro";

import type { ShopCategory, ShopItem } from "./shopItems";

export const hero = {
  title: "Boutique du Club",
  subtitle: "Equipements premium et goodies exclusifs",
  lead:
    "Découvrez notre sélection d'équipements de qualité professionnelle issus de nos partenaires, ainsi que nos goodies exclusifs aux couleurs du club. Tous les articles sont disponibles directement au pro-shop avec retrait sur place.",
  reassurance: [
    "Retrait gratuit au club",
    "-10% membres Excellence & Prestige",
  ],
  ctas: {
    primary: { label: "Découvrir les articles", href: "#articles" }
  },
};

export const categoryMeta: Record<ShopCategory, { label: string; Icon: any }> = {
  raquettes: { label: "Raquettes", Icon: IconTennisRacket },
  balles: { label: "Balles", Icon: IconTennisBall },
  vetements: { label: "Vêtements", Icon: IconDress },
  accessoires: { label: "Accessoires", Icon: IconVisor },
  goodies: { label: "Goodies Club", Icon: IconClub },
};

export const categoryOrder: ShopCategory[] = [
  "raquettes",
  "balles",
  "vetements",
  "accessoires",
  "goodies",
];

export const selectionIds = [1, 3, 4, 10, 8];

export const services = [
  {
    title: "Retrait Gratuit au Club",
    description: "Commandez et retirez vos articles au pro-shop sans frais.",
    Icon: IconParcel,
  },
  {
    title: "Reduction Membres",
    description: "-10% automatique pour les membres Excellence et Prestige.",
    Icon: IconClub,
  },
  {
    title: "Conseils Experts",
    description: "Notre équipe vous guide pour choisir l'équipement adapté à votre niveau.",
    Icon: IconUsers,
  },
];

export const practical = {
  title: "Retrait au club, échanges et tailles",
  items: [
    "Retrait gratuit au pro-shop pendant les horaires d'ouverture.",
    "Essayage possible au club selon disponibilité des tailles.",
    "Accompagnement de l'equipe pour le choix du matériel."
  ],
  proShop: [
    "Lundi - Vendredi : 9h - 18h",
    "Samedi : 10h - 19h",
    "Fermé les dimanches et jours fériés",
  ],
  payment: [
    "Cartes bancaires (CB, Visa, Mastercard)",
    "Espèces",
    "Chèques",
    "Paiement en ligne sécurisé",
  ],
  note: "Une question sur un produit ? Contactez le pro-shop au 01 23 45 67 89.",
};

export const joinSection = {
  title: "Besoin d'un conseil avant achat ?",
  body: "Notre équipe vous accompagne pour vérifier les tailles, le stock et les options de retrait au club.",
  ctas: [
    { label: "Nous contacter", href: "/contact", variant: "primary" as const },
    { label: "Passer au club", href: "/contact", variant: "alt" as const },
  ],
  bgKey: "tennis" as const,
};

export function buildBoutiqueCollections(items: ShopItem[]) {
  const availableCategories = new Set(items.map((item) => item.category));

  const categories = categoryOrder
    .filter((slug) => availableCategories.has(slug))
    .map((slug) => ({
      slug,
      label: categoryMeta[slug].label,
      Icon: categoryMeta[slug].Icon,
    }));

  const selection = selectionIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is ShopItem => Boolean(item));

  return { categories, selection };
}
