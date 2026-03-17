import type { ImageMetadata } from "astro";
import type { AstroIconComponent } from "../types/icons";

import IconTrophy from "@components/icons/IconTrophy.astro";
import IconUsers from "@components/icons/IconUsers.astro";
import IconHeart from "@components/icons/IconHeart.astro";
import IconBolt from "@components/icons/IconBolt.astro";
import IconAcademicCap from "@components/icons/IconAcademicCap.astro";
import IconCalendar from "@components/icons/IconCalendar.astro";
import IconStar from "@components/icons/IconStar.astro";
import IconFitness from "@components/icons/IconFitness.astro";
import IconLeaf from "@components/icons/IconLeaf.astro";
import IconAward from "@components/icons/IconAward.astro";
import IconSparks from "@components/icons/IconSparks.astro";

import histBg from "@assets/images/sections/tcgv-history-general-1600.webp";
import clayBg from "@assets/images/backgrounds/tcgv-bg-clay-1920.webp";
import greenBg from "@assets/images/backgrounds/tcgv-bg-green-1920.webp";
import card1 from "@assets/images/cards/tcgv-card-tenniscourt-800.webp";
import card2 from "@assets/images/cards/tcgv-card-padel-court-800.webp";
import card3 from "@assets/images/cards/tcgv-card-services-restaurant-800.webp";
import service1 from "@assets/images/cards/tcgv-card-coach-800.webp";
import service2 from "@assets/images/sections/tcgv-schedule-clock-1600.webp";
import service3 from "@assets/images/cards/tcgv-card-courtlines-800.webp";
import service4 from "@assets/images/cards/tcgv-card-services-gym-800.webp";
import commit1 from "@assets/images/cards/tcgv-card-green-800.webp";
import commit2 from "@assets/images/cards/tcgv-card-clubhouse-800.webp";
import commit3 from "@assets/images/cards/tcgv-card-coaching-800.webp";

interface HomeIconItem {
  title: string;
  subtitle: string;
  Icon: AstroIconComponent;
}

interface HomeCardItem {
  href: string;
  title: string;
  text: string;
  cta: string;
  image: ImageMetadata;
}

interface HomeServiceItem extends HomeCardItem {
  Icon: AstroIconComponent;
}

interface HomeCommitmentItem extends HomeCardItem {
  Icon: AstroIconComponent;
}

export const metaDescription =
  "Le TCGV est un club de terre battue établi depuis 1974, où la pratique régulière du tennis s'inscrit dans la durée, la transmission et la vie collective.";

export const historySection: {
  id: string;
  title: string;
  image: ImageMetadata;
  imageAlt: string;
  bodyParagraphs: string[];
  values: HomeIconItem[];
} = {
  id: "histoire",
  title: "Notre histoire",
  image: histBg,
  imageAlt: "Archives du Tennis Club du Grand Versailles",
  bodyParagraphs: [
    "Fondé en 1974, le Tennis Club du Grand Versailles s'est construit dans la durée, avec une organisation claire et un ancrage local affirmé. Dès ses premières années, le club a fait le choix d'un cadre stable, pensé pour la pratique régulière et l'accueil de publics variés. Cette base historique a permis au TCGV de se développer sans rupture, en conservant un fonctionnement lisible pour les joueurs, les familles et les équipes encadrantes.",
    "La terre battue y tient une place centrale. Elle structure une culture de jeu exigeante, fondée sur la régularité, la construction du point et la progression technique dans le temps. Semaine après semaine, entraînements, cours et rencontres sportives installent un rythme cohérent, fidèle aux exigences du tennis et au calendrier de la saison.",
    "Aujourd'hui, le TCGV poursuit cette continuité avec la même ligne : proposer un club sérieux, vivant et accessible. La transmission entre générations reste au cœur du projet, entre enseignants, jeunes joueurs, adultes et compétiteurs. Cette fidélité au jeu, associée à une vie collective active, donne au club sa stabilité et son identité depuis plus de cinquante ans.",
  ],
  values: [
    { title: "Excellence", subtitle: "Standards élevés", Icon: IconStar },
    { title: "Communauté", subtitle: "Esprit de famille", Icon: IconUsers },
    { title: "Passion", subtitle: "Amour du sport", Icon: IconHeart },
    { title: "Innovation", subtitle: "Equipements modernes", Icon: IconBolt },
  ],
};

export const installationsSection: {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: ImageMetadata;
  items: HomeCardItem[];
} = {
  id: "installations",
  title: "Nos installations",
  subtitle: "Des courts de terre battue pour jouer toute l'année",
  backgroundImage: clayBg,
  items: [
    {
      href: "/le-club/infrastructures",
      title: "Courts de Tennis",
      text: "12 courts extérieurs et 5 courts couverts en terre battue, éclairés pour jouer en soirée",
      cta: "Voir les courts",
      image: card1,
    },
    {
      href: "/contact",
      title: "Padel",
      text: "Projet de création de deux terrains pour compléter la pratique au club.",
      cta: "Voir le projet",
      image: card2,
    },
    {
      href: "/le-club/infrastructures",
      title: "Club House",
      text: "Espace de vie et de rencontre qui prolonge la pratique sportive.",
      cta: "Voir le club house",
      image: card3,
    },
  ],
};

export const servicesSection: {
  id: string;
  title: string;
  subtitle: string;
  items: HomeServiceItem[];
} = {
  id: "services",
  title: "Nos services",
  subtitle: "Un accompagnement structuré pour une progression durable",
  items: [
    {
      href: "/activites-cours",
      title: "École de Tennis",
      text: "Cours individuels et collectifs, de l'initiation à la compétition, avec un encadrement diplômé.",
      cta: "Voir les cours",
      image: service1,
      Icon: IconAcademicCap,
    },
    {
      href: "/login",
      title: "Réservations",
      text: "Accès simple à vos créneaux pour installer une pratique hebdomadaire régulière.",
      cta: "Accéder à la réservation",
      image: service2,
      Icon: IconCalendar,
    },
    {
      href: "/contact",
      title: "Événements sportifs",
      text: "Tournois et rencontres qui rythment la saison sportive du club.",
      cta: "Voir le calendrier",
      image: service3,
      Icon: IconTrophy,
    },
    {
      href: "/activites-cours",
      title: "Préparation physique",
      text: "Travail complémentaire pour soutenir la progression et la continuité de jeu.",
      cta: "Voir les cours",
      image: service4,
      Icon: IconFitness,
    },
  ],
};

export const commitmentsSection: {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: ImageMetadata;
  items: HomeCommitmentItem[];
} = {
  id: "engagements",
  title: "Nos engagements",
  subtitle: "Des repères stables pour les joueurs et les familles",
  backgroundImage: greenBg,
  items: [
    {
      href: "/le-club/equipe-dirigeante",
      title: "Respect environnemental",
      text: "Le club applique une gestion raisonnée de l’eau, de l’énergie et de l’entretien des installations, dans une logique durable.",
      image: commit1,
      cta: "Voir l'équipe dirigeante",
      Icon: IconLeaf,
    },
    {
      href: "/le-club/equipe-pedagogique",
      title: "Engagement pédagogique",
      text: "Nos enseignants diplômés accompagnent chaque joueur avec des repères clairs, un suivi régulier et une progression adaptée.",
      image: commit3,
      cta: "Voir l'équipe pédagogique",
      Icon: IconAward,
    },
    {
      href: "/le-club/infrastructures",
      title: "Convivialité et détente",
      text: "Le club house et les espaces de repos permettent de prolonger la pratique sportive dans un cadre calme et convivial.",
      image: commit2,
      cta: "Voir les installations",
      Icon: IconSparks,
    },
  ],
};
