export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

export const historyTimeline: TimelineItem[] = [
  {
    year: "1974",
    title: "Fondation du TCGV",
    description: "Création du club et mise en service des premiers courts de tennis.",
  },
  {
    year: "1989",
    title: "Développement des installations",
    description: "Extension des courts et structuration durable de la vie du club.",
  },
  {
    year: "2018",
    title: "Projet padel intégré",
    description:
      "Le padel est intégré au projet sportif du club pour compléter la pratique annuelle.",
  },
  {
    year: "2024",
    title: "Rénovation des infrastructures",
    description: "Travaux de modernisation pour améliorer l'accueil et la qualité de pratique.",
  },
];

export const historyStats: StatItem[] = [
  { label: "Années d’existence", value: "50+" },
  { label: "Membres actifs", value: "1100+" },
  { label: "Courts disponibles", value: "12" },
  { label: "Tournois organisés", value: "55+" },
];
