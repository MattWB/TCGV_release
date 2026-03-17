import type { ImageMetadata } from "astro";

import productImg from "@images/cards/tcgv-card-shop-default-800.webp";
import racketImg from "@images/cards/tcgv-card-shop-racket-800.webp";
import ballImg from "@images/cards/tcgv-card-shop-balls-800.webp";
import shirtImg from "@images/cards/tcgv-card-shop-shirt-800.webp";
import shoeImg from "@images/cards/tcgv-card-shop-shoes-800.webp";
import clubImg from "@images/cards/tcgv-card-shop-club-800.webp";
import capImg from "@images/cards/tcgv-card-shop-cap-800.webp";
import bottleImg from "@images/cards/tcgv-card-shop-bottle-800.webp";
import accessImg from "@images/cards/tcgv-card-shop-accessories-800.webp";

export type ShopCategory =
  | "raquettes"
  | "balles"
  | "vetements"
  | "accessoires"
  | "goodies";

export type ShopItem = {
  id: number;
  name: string;
  description: string;
  category: ShopCategory;
  badge?: string;
  priceCents: number;
  priceLabel: string;
  imageSrc: ImageMetadata;
  tags?: string[];
};

export const shopItems: ShopItem[] = [
  {
    id: 1,
    name: "Raquette Pro Elite Carbon",
    description: "Raquette haute performance en carbone, 300g, tamis 645cm2.",
    category: "raquettes",
    badge: "Nouveau",
    priceCents: 24900,
    priceLabel: "249 EUR",
    imageSrc: racketImg,
    tags: ["carbone", "performance", "raquette"],
  },
  {
    id: 2,
    name: "Raquette Performance Plus",
    description: "Idéale pour joueurs intermédiaires, excellent contrôle.",
    category: "raquettes",
    badge: "Promo -14%",
    priceCents: 18900,
    priceLabel: "189 EUR",
    imageSrc: racketImg,
    tags: ["raquette", "controle", "intermediaire"],
  },
  {
    id: 3,
    name: "Balles Premium x4",
    description: "Balles haute qualité, homologuées compétition.",
    category: "balles",
    priceCents: 790,
    priceLabel: "7,90 EUR",
    imageSrc: ballImg,
    tags: ["balles", "competition"],
  },
  {
    id: 4,
    name: "Balles Entrainement x12",
    description: "Pack économique pour entraînement régulier.",
    category: "balles",
    badge: "Meilleur prix",
    priceCents: 1990,
    priceLabel: "19,90 EUR",
    imageSrc: ballImg,
    tags: ["balles", "entrainement", "pack"],
  },
  {
    id: 5,
    name: "Polo Performance Blanc",
    description: "Tissu respirant, coupe ergonomique, séchage rapide.",
    category: "vetements",
    priceCents: 4500,
    priceLabel: "45 EUR",
    imageSrc: shirtImg,
    tags: ["polo", "respirant", "vetement"],
  },
  {
    id: 6,
    name: "Short Technique Marine",
    description: "Poches zippées, traitement anti-UV.",
    category: "vetements",
    badge: "Promo -16%",
    priceCents: 3800,
    priceLabel: "38 EUR",
    imageSrc: shirtImg,
    tags: ["short", "anti-uv", "vetement"],
  },
  {
    id: 7,
    name: "Chaussures Court Pro",
    description: "Semelle spéciale terre battue, amorti optimal.",
    category: "vetements",
    priceCents: 12900,
    priceLabel: "129 EUR",
    imageSrc: shoeImg,
    tags: ["chaussures", "terre battue", "court"],
  },
  {
    id: 8,
    name: "Anti-vibrateurs Pro x2",
    description: "Réduction des vibrations et meilleur confort.",
    category: "accessoires",
    priceCents: 890,
    priceLabel: "8,90 EUR",
    imageSrc: accessImg,
    tags: ["accessoire", "confort", "raquette"],
  },
  {
    id: 9,
    name: "Surgrip Premium x3",
    description: "Grip absorbant, adhérence maximale.",
    category: "accessoires",
    priceCents: 1290,
    priceLabel: "12,90 EUR",
    imageSrc: accessImg,
    tags: ["surgrip", "grip", "accessoire"],
  },
  {
    id: 10,
    name: "Sac de Sport Club",
    description: "3 compartiments, porte-raquettes intégré.",
    category: "accessoires",
    badge: "Bestseller",
    priceCents: 7900,
    priceLabel: "79 EUR",
    imageSrc: clubImg,
    tags: ["sac", "club", "accessoire"],
  },
  {
    id: 11,
    name: "Gourde Isotherme 750ml",
    description: "Maintien température 12h, sans BPA.",
    category: "accessoires",
    priceCents: 2490,
    priceLabel: "24,90 EUR",
    imageSrc: bottleImg,
    tags: ["gourde", "isotherme", "hydratation"],
  },
  {
    id: 12,
    name: "Poignets Eponge x2",
    description: "Coton absorbant, confort optimal.",
    category: "accessoires",
    priceCents: 990,
    priceLabel: "9,90 EUR",
    imageSrc: accessImg,
    tags: ["poignets", "eponge", "confort"],
  },
  {
    id: 13,
    name: "T-shirt Logo Club",
    description: "100% coton bio, logo brodé exclusif.",
    category: "goodies",
    badge: "Exclusif",
    priceCents: 2990,
    priceLabel: "29,90 EUR",
    imageSrc: clubImg,
    tags: ["t-shirt", "logo", "club"],
  },
  {
    id: 14,
    name: "Casquette Club Premium",
    description: "Ajustable, protection UV, logo brodé 3D.",
    category: "goodies",
    badge: "Exclusif",
    priceCents: 2490,
    priceLabel: "24,90 EUR",
    imageSrc: capImg,
    tags: ["casquette", "club", "goodies"],
  },
  {
    id: 15,
    name: "Sac Fourre-tout Club",
    description: "Toile résistante, sérigraphie logo club.",
    category: "goodies",
    badge: "Exclusif",
    priceCents: 1990,
    priceLabel: "19,90 EUR",
    imageSrc: clubImg,
    tags: ["sac", "goodies", "club"],
  },
  {
    id: 16,
    name: "Serviette Microfibre Club",
    description: "Séchage rapide, compacte, logo imprimé.",
    category: "goodies",
    badge: "Exclusif",
    priceCents: 1690,
    priceLabel: "16,90 EUR",
    imageSrc: accessImg,
    tags: ["serviette", "microfibre", "goodies"],
  },
];
