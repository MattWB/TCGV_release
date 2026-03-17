// IMAGES
import presidentImg from "@assets/images/cards/tcgv-card-bureau-man1-800.webp";
import directorImg from "@assets/images/cards/tcgv-card-bureau-woman1-800.webp";
import sportsDirectorImg from "@assets/images/cards/tcgv-card-bureau-man2-800.webp";
import eventManagerImg from "@assets/images/cards/tcgv-card-bureau-woman2-800.webp";
import facilitiesManagerImg from "@assets/images/cards/tcgv-card-bureau-man3-800.webp";
import servicesManagerImg from "@assets/images/cards/tcgv-card-bureau-woman3-800.webp";

// ICONS
import IconTrophy from "@components/icons/IconTrophy.astro";
import IconHeart from "@components/icons/IconHeart.astro";
import IconBolt from "@components/icons/IconBolt.astro";
import IconUsers from "@components/icons/IconUsers.astro";

// DATA
export const equipeDirigeanteSeo = {
  title: "Équipe dirigeante — TCGV",
  description:
    "Découvrez l’équipe dirigeante du Tennis Club du Grand Versailles : une direction engagée au service de la vie sportive du club.",
};

export const hero = {
  title: "Notre Équipe Dirigeante",
  subtitle: "Une direction engagée au service du projet du club",
  watermark: "Dirigeants",
};

export const introSubtitle = `La direction du TCGV organise la saison sportive, veille à la qualité de l'accueil et accompagne la progression des joueurs dans la durée.

Chaque responsable contribue, dans son domaine, à faire vivre un club structuré, accessible et fidèle à son identité.`;

export const teamMembers = [
  {
    name: "Philippe Martineau",
    role: "Président",
    description:
      "Engagé dans la vie du club depuis de nombreuses années, Philippe porte une direction attentive au projet sportif et à la vie collective du TCGV.",
    imageSrc: presidentImg,
    email: "p.martineau@club.com",
    linkedin: "#",
  },
  {
    name: "Sophie Renard",
    role: "Directrice Générale",
    description:
      "Sophie coordonne l'organisation générale du club et assure la cohérence des projets au service des membres et des équipes.",
    imageSrc: directorImg,
    email: "s.renard@club.com",
    linkedin: "#",
  },
  {
    name: "Marc Dubois",
    role: "Directeur Sportif",
    description:
      "Ancien joueur professionnel et entraîneur diplômé d'État, Marc supervise les activités sportives et la formation des enseignants.",
    imageSrc: sportsDirectorImg,
    email: "m.dubois@club.com",
    linkedin: "#",
  },
  {
    name: "Isabelle Chevalier",
    role: "Responsable Événements & Communication",
    description:
      "Isabelle organise les événements et coordonne la communication du club pour rythmer la saison sportive et la vie collective.",
    imageSrc: eventManagerImg,
    email: "i.chevalier@club.com",
    linkedin: "#",
  },
  {
    name: "Thomas Leroux",
    role: "Responsable Infrastructures",
    description:
      "Thomas veille à l'entretien des installations et à la qualité des équipements pour garantir des conditions de pratique régulières.",
    imageSrc: facilitiesManagerImg,
    email: "t.leroux@club.com",
    linkedin: "#",
  },
  {
    name: "Caroline Moreau",
    role: "Responsable Accueil & Relations Membres",
    description:
      "Caroline coordonne l'accueil et accompagne les membres dans leurs démarches quotidiennes, avec une attention constante à la qualité de service.",
    imageSrc: servicesManagerImg,
    email: "c.moreau@club.com",
    linkedin: "#",
  },
];

export const visionValues = [
  {
    title: "Excellence sportive",
    Icon: IconTrophy,
    text: "Nous maintenons un cadre de pratique exigeant et un encadrement structuré pour accompagner la progression de tous les joueurs.",
  },
  {
    title: "Esprit familial",
    Icon: IconHeart,
    text: "Au-delà de la pratique sportive, nous veillons à un club accueillant où chaque membre trouve sa place dans la durée.",
  },
  {
    title: "Évolution du club",
    Icon: IconBolt,
    text: "Nous faisons évoluer le club de manière régulière, en adaptant les équipements et l'organisation aux besoins réels des membres.",
  },
  {
    title: "Accessibilité",
    Icon: IconUsers,
    text: "Nous défendons une pratique ouverte à tous, avec des formats adaptés pour permettre à chacun de jouer et progresser.",
  },
];

export const quote = {
  text: "La direction du TCGV veille à une organisation stable du club, à la progression sportive des membres et à la transmission entre générations.",
  author: "— L'équipe dirigeante",
};

export const joinSection = {
  title: "Participez à la vie du club",
  bgKey: "community" as const,
  body: "Le TCGV vit grâce à l’engagement de ses membres et bénévoles. N’hésitez pas à nous contacter pour échanger ou vous impliquer dans la vie du club.",
  note: "Une question ? • Réponse sous 48h",
  ctas: [
    {
      label: "Prendre rendez-vous",
      href: "/contact",
      variant: "primary" as const,
    },
    { label: "Nous contacter", href: "/contact", variant: "alt" as const },
  ],
};
