import bannerImg from "@assets/images/sections/tcgv-facilities-general-1600.webp";
import tennisImg from "@assets/images/sections/tcgv-facilities-tennis-1600.webp";
import padelImg from "@assets/images/sections/tcgv-facilities-padel-1600.webp";
import clubhouseImg from "@assets/images/sections/tcgv-facilities-clubhouse-1600.webp";
import lockersImg from "@assets/images/sections/tcgv-facilities-lockers-1600.webp";
import gymImg from "@assets/images/sections/tcgv-facilities-gym-1600.webp";
import parkingImg from "@assets/images/sections/tcgv-facilities-parking-1600.webp";

import IconLight from "@components/icons/IconLight.astro";
import IconWifi from "@components/icons/IconWifi.astro";
import IconShop from "@components/icons/IconShop.astro";
import IconSecure from "@components/icons/IconSecure.astro";
import IconRestaurant from "@components/icons/IconRestaurant.astro";
import IconMappin from "@components/icons/IconMappin.astro";
import IconSauna from "@components/icons/IconSauna.astro";
import IconHeart from "@components/icons/IconHeart.astro";

export const hero = {
  title: "Nos infrastructures",
  subtitle:
    "Des infrastructures au service d'une pratique régulière, toute l'année.",
  img: bannerImg,
  alt: "Vue d'ensemble des installations",
  watermark: "Infrastructures",
};

export const introSubtitle =
  "Les infrastructures accompagnent une même philosophie : rendre la pratique régulière du tennis possible toute l'année, dans un cadre structuré, accessible et fidèle à la vie du club.";

export const vision = {
  watermark: "Espaces",
  paragraphs: [
    "Les infrastructures du TCGV sont organisées pour soutenir une pratique régulière du tennis, dans un cadre stable et lisible pour les membres. L'objectif est de permettre à chacun de jouer dans de bonnes conditions, semaine après semaine.",
    "La terre battue occupe une place centrale dans cette organisation. Son entretien, le rythme des entraînements et le calendrier sportif du club s'inscrivent dans la continuité, saison après saison.",
    "Des espaces complémentaires, comme le club house, les vestiaires et les zones de préparation, prolongent la pratique sportive au quotidien. Cet ensemble contribue à la progression des joueurs et à la vie collective du club.",
  ],
};

export const facilities = [
  {
    title: "Courts de Tennis",
    description:
      "12 courts de tennis dont 5 couverts, en terre battue. Tous équipés d'un éclairage LED dernière génération permettant de jouer jusqu'à 23h. Entretien quotidien et arrosage automatique pour une qualité de jeu optimale.",
    imageSrc: tennisImg,
    stats: ["12 courts", "5 couverts", "Éclairage LED"],
  },
  {
    title: "Terrains de Padel",
    description:
      "2 terrains de padel sont en projet de construction. Ils viendront compléter l'offre sportive du club à l'avenir, avec des équipements adaptés à tous les niveaux.",
    imageSrc: padelImg,
    stats: [
      "2 terrains (projet)",
      "Construction à venir",
      "Mise en service future",
    ],
  },
  {
    title: "Club House Premium",
    description:
      "Espace de convivialité de 400m² comprenant un restaurant, salon lounge avec terrasse, bar et espace co-working Wi-Fi. Le lieu idéal pour se détendre après l'effort ou organiser vos événements.",
    imageSrc: clubhouseImg,
    stats: ["Restaurant", "Terrasse", "Espace lounge"],
  },
  {
    title: "Vestiaires & Spa",
    description:
      "Vestiaires individuels climatisés avec casiers sécurisés, douches à l'italienne, sauna et hammam. Zone bien-être pour la récupération. Confort et qualité de service au quotidien.",
    imageSrc: lockersImg,
    stats: ["Sauna", "Casiers sécurisés"],
  },
  {
    title: "Salle de Préparation Physique",
    description:
      "Espace fitness équipé (cardio, musculation, zone stretching). Coaching personnalisé disponible. Idéal pour compléter votre entraînement tennis/padel.",
    imageSrc: gymImg,
    stats: ["Espace fitness", "Coaching", "Zone stretching"],
  },
  {
    title: "Parking & Accès",
    description:
      "Parking sécurisé avec emplacements dédiés, accès PMR sur les installations, zones de dépose et stationnement pratique à proximité des courts.",
    imageSrc: parkingImg,
    stats: ["Parking", "Accès PMR", "Accès facile"],
  },
];

export const services = [
  {
    title: "Éclairage nocturne",
    desc: "LED premium sur tous les courts",
    icon: IconLight,
  },
  {
    title: "Wi-Fi gratuit",
    desc: "Connexion haut débit partout",
    icon: IconWifi,
  },
  { title: "Pro Shop", desc: "Boutique équipements & cordage", icon: IconShop },
  {
    title: "Casiers sécurisés",
    desc: "Vestiaires individuels",
    icon: IconSecure,
  },
  {
    title: "Bar & Restaurant",
    desc: "Service traiteur disponible",
    icon: IconRestaurant,
  },
  {
    title: "Parking sécurisé",
    desc: "Accès simple et pratique",
    icon: IconMappin,
  },
  {
    title: "Spa & Bien-être",
    desc: "Sauna, récupération",
    icon: IconSauna,
  },
  { title: "Confort", desc: "Espaces adaptés toute l'année", icon: IconHeart },
];

export const joinSection = {
  title: "Visitez nos installations",
  bgKey: "club" as const,
  body: "Prenez rendez-vous pour découvrir les installations du TCGV et leur organisation au service de la pratique régulière.",
  note: "Réponse sous 48h",
  ctas: [
    {
      label: "Réserver une visite",
      href: "/contact",
      variant: "primary" as const,
    },
  ],
};
