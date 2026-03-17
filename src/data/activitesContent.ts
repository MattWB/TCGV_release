import clayBg from "@assets/images/backgrounds/tcgv-bg-clay-1920.webp";
import beginnerTrainingImg from "@assets/images/cards/tcgv-card-training-beginner-800.webp";
import intermediateTrainingImg from "@assets/images/cards/tcgv-card-training-intermediate-800.webp";
import advancedTrainingImg from "@assets/images/cards/tcgv-card-training-advanced-800.webp";
import competitionTrainingImg from "@assets/images/cards/tcgv-card-training-competition-800.webp";
import kidsCourseImg from "@assets/images/sections/tcgv-course-kids-1600.webp";
import clockImg from "@assets/images/sections/tcgv-schedule-clock-1600.webp";

import IconAcademicCap from "@components/icons/IconAcademicCap.astro";
import IconUsers from "@components/icons/IconUsers.astro";
import IconBolt from "@components/icons/IconBolt.astro";
import IconAward from "@components/icons/IconAward.astro";
import IconSun from "@components/icons/IconSun.astro";
import IconSnowflake from "@components/icons/IconSnowflake.astro";
import IconLeaf from "@components/icons/IconLeaf.astro";
import IconFlower from "@components/icons/IconFlower.astro";
import IconCalendar from "@components/icons/IconCalendar.astro";
import IconClock from "@components/icons/IconClock.astro";
import IconTarget from "@components/icons/IconTarget.astro";

export { clayBg, kidsCourseImg, clockImg };

export const hero = {
  title: "Activités & Cours",
  subtitle: "Cours, stages, tournois : développez votre jeu à tous les niveaux",
  watermark: "Tennis",
};

export const lessons = [
  {
    title: "Cours Débutants",
    description:
      "Apprentissage des bases techniques : coups droits, revers, service et volée. Mise en situation de jeu progressive.",
    level: "Blanc / Jaune",
    duration: "1h / semaine",
    groupSize: "4–6 joueurs",
    imageSrc: beginnerTrainingImg,
    Icon: IconAcademicCap,
    cta: { label: "S'inscrire", href: "/inscriptions" },
  },
  {
    title: "Cours Intermédiaires",
    description:
      "Perfectionnement technique, développement tactique et initiation au jeu de double. Matchs encadrés.",
    level: "Orange / Vert",
    duration: "1h30 / semaine",
    groupSize: "4–6 joueurs",
    imageSrc: intermediateTrainingImg,
    Icon: IconUsers,
    cta: { label: "S'inscrire", href: "/inscriptions" },
  },
  {
    title: "Cours Avancés",
    description:
      "Travail intensif sur les variations de jeu, placement stratégique et endurance. Préparation physique intégrée.",
    level: "Rouge / Blanc",
    duration: "2h / semaine",
    groupSize: "3–4 joueurs",
    imageSrc: advancedTrainingImg,
    Icon: IconBolt,
    cta: { label: "S'inscrire", href: "/inscriptions" },
  },
  {
    title: "Groupe Compétition",
    description:
      "Programme élite pour joueurs classés. Entraînements techniques, tactiques, physiques et mentaux. Suivi personnalisé.",
    level: "Classement FFT",
    duration: "3–4h / semaine",
    groupSize: "2–4 joueurs",
    imageSrc: competitionTrainingImg,
    Icon: IconAward,
    cta: { label: "Candidater", href: "/contact" },
  },
];

export const camps = [
  {
    season: "Printemps",
    period: "Avril – Mai",
    description:
      "Stage de reprise sur terre battue, travail technique et matchs",
    ages: "5–17 ans",
    Icon: IconFlower,
    gradientClass: "tcgv-grad-spring",
  },
  {
    season: "Été",
    period: "Juillet – Août",
    description: "Stages intensifs multi-niveaux avec tournoi de fin de stage",
    ages: "5–17 ans",
    Icon: IconSun,
    gradientClass: "tcgv-grad-summer",
  },
  {
    season: "Automne",
    period: "Octobre – Novembre",
    description: "Stage d'entraînement indoor, perfectionnement technique",
    ages: "5–17 ans",
    Icon: IconLeaf,
    gradientClass: "tcgv-grad-autumn",
  },
  {
    season: "Hiver",
    period: "Février",
    description: "Stage de préparation physique et travail en salle couverte",
    ages: "5–17 ans",
    Icon: IconSnowflake,
    gradientClass: "tcgv-grad-winter",
  },
];

export const tournaments = [
  {
    title: "Tournoi Interne Printemps",
    type: "Tournoi amical",
    date: "Mars",
    level: "Tous niveaux",
    description: "Tournoi convivial en simple et double pour lancer la saison",
  },
  {
    title: "Open du Club",
    type: "Tournoi officiel FFT",
    date: "Juin",
    level: "Classés FFT",
    description: "Compétition homologuée FFT sur 3 jours avec dotations",
  },
  {
    title: "Championnat d'Été",
    type: "Tournoi jeunes",
    date: "Août",
    level: "6–18 ans",
    description: "Tournoi par catégories d'âge avec remise de prix",
  },
  {
    title: "Masters de Fin d'Année",
    type: "Tournoi interne",
    date: "Décembre",
    level: "Membres du club",
    description: "Grand tournoi de clôture réunissant tous les membres",
  },
];

export const booking = {
  title: "Réservation de Courts",
  description:
    "Réservez vos courts en ligne 24h/24, 7j/7 via notre plateforme de réservation. Système simple et rapide accessible depuis votre compte membre.",
  features: [
    {
      title: "Horaires flexibles",
      text: "Réservation de 7h à 23h tous les jours",
      Icon: IconClock,
    },
    {
      title: "Réservation anticipée",
      text: "Jusqu'à 7 jours à l'avance pour les membres",
      Icon: IconCalendar,
    },
    {
      title: "Choix du type de court",
      text: "Terre battue, hard court ou padel selon vos préférences",
      Icon: IconTarget,
    },
  ],
  cta: { label: "Accéder à la réservation", href: "/login" },
};
