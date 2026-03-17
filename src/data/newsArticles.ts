import type { ImageMetadata } from "astro";

// IMAGES
import tournamentImg from "@images/cards/tcgv-card-news-tennis-open-800.webp";
import padelImg from "@images/cards/tcgv-card-news-padel-team-800.webp";
import appImg from "@images/cards/tcgv-card-news-mobile-800.webp";
import masterclassImg from "@images/cards/tcgv-card-news-masterclass-800.webp";
import meetingImg from "@images/cards/tcgv-card-news-meeting-800.webp";
import eventImg from "@images/cards/tcgv-card-news-club-event-800.webp";

// PROPS
export type NewsCategory =
  | "Tous"
  | "Événements"
  | "Tournois"
  | "Vie du Club"
  | "Performances"
  | "Infrastructures";

export type NewsResponsiveImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type NewsArticle = {
  id: number;
  title: string;
  category: Exclude<NewsCategory, "Tous">;
  date: string;
  imageSrc: ImageMetadata;
  excerpt: string;
  featured: boolean;
};
export type NewsArticleWithImage = Omit<NewsArticle, "imageSrc"> & {
  image: NewsResponsiveImage;
};

// DATA
export const newsCategories: NewsCategory[] = [
  "Tous",
  "Événements",
  "Tournois",
  "Vie du Club",
  "Performances",
  "Infrastructures",
];

export const newsArticles: NewsArticle[] = [
  {
    id: 9,
    title: "Masterclass avec Lucas Dubois, Ex-Joueur Professionnel",
    category: "Événements",
    date: "04 Mars 2026",
    imageSrc: masterclassImg,
    excerpt:
      "Rendez-vous le 10 mars pour une masterclass exclusive avec Lucas Dubois, ancien top 150 ATP, qui partagera son expérience et ses conseils.",
    featured: false,
  },
  {
    id: 1,
    title: "Tournoi Interne d'Automne : Une Édition Exceptionnelle",
    category: "Tournois",
    date: "15 Janvier 2026",
    imageSrc: tournamentImg,
    excerpt:
      "Plus de 80 participants se sont affrontés lors de notre tournoi interne d'automne. Une ambiance conviviale et des matchs de haut niveau ont marqué ce week-end exceptionnel.",
    featured: true,
  },
  {
    id: 2,
    title: "Nouveaux Courts de Padel : L'Inauguration Approche",
    category: "Infrastructures",
    date: "12 Janvier 2026",
    imageSrc: padelImg,
    excerpt:
      "Nos deux nouveaux courts de padel couverts seront inaugurés le 1er juillet. Équipés des dernières technologies, ils offriront des conditions de jeu optimales toute l'année.",
    featured: false,
  },
  {
    id: 3,
    title: "Stage Jeunes Vacances d'Hiver : Les Inscriptions sont ouvertes",
    category: "Événements",
    date: "10 Janvier 2026",
    imageSrc: tournamentImg,
    excerpt:
      "Du 17 au 21 février, nos enseignants proposeront un stage intensif pour les jeunes de 8 à 16 ans. Technique, tactique et convivialité au programme.",
    featured: false,
  },
  {
    id: 4,
    title: "Emma Rousseau Qualifiée pour le Championnat Régional",
    category: "Performances",
    date: "8 Janvier 2026",
    imageSrc: tournamentImg,
    excerpt:
      "Membre de notre club depuis 5 ans, Emma s'est brillamment qualifiée pour le championnat régional -15 ans. Toute l'équipe est fière de son parcours.",
    featured: false,
  },
  {
    id: 5,
    title: "Soirée Galette des Rois : Un Moment Convivial Réussi",
    category: "Vie du Club",
    date: "7 Janvier 2026",
    imageSrc: eventImg,
    excerpt:
      "Plus de 120 membres se sont retrouvés au club-house pour partager la galette et échanger dans une ambiance chaleureuse. Rendez-vous l'année prochaine !",
    featured: false,
  },
  {
    id: 6,
    title: "Interclub Padel : Victoire de Notre Équipe Première",
    category: "Tournois",
    date: "5 Janvier 2026",
    imageSrc: padelImg,
    excerpt:
      "Notre équipe première de padel a remporté brillamment la rencontre interclub face au Tennis Club des Pins. Bravo à tous les joueurs !",
    featured: false,
  },
  {
    id: 7,
    title: "Nouvelle Application Mobile : Réservez Vos Courts en un Clic",
    category: "Infrastructures",
    date: "3 Janvier 2026",
    imageSrc: appImg,
    excerpt:
      "Téléchargez notre nouvelle application mobile pour réserver vos courts, consulter les plannings des cours et suivre toute l'actualité du club.",
    featured: false,
  },
  {
    id: 8,
    title: "Assemblée Générale Annuelle : Save the Date",
    category: "Vie du Club",
    date: "2 Janvier 2026",
    imageSrc: meetingImg,
    excerpt:
      "L'assemblée générale annuelle se tiendra le 20 février à 19h au club-house. Venez nombreux pour échanger sur l'année écoulée et les projets à venir.",
    featured: false,
  },
];

export const featuredNewsArticle =
  newsArticles.find((article) => article.featured) ?? null;
