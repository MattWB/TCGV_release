// IMAGES
import seniorManagerImg from "@assets/images/cards/tcgv-card-team-coachman1-800.webp";
import schoolManagerImg from "@assets/images/cards/tcgv-card-team-coachwoman1-800.webp";
import padelCoachImg from "@assets/images/cards/tcgv-card-team-coachman2-800.webp";
import mentalCoachImg from "@assets/images/cards/tcgv-card-team-coachwoman2-800.webp";
import healthCoachImg from "@assets/images/cards/tcgv-card-team-coachman3-800.webp";
import courseCoachImg from "@assets/images/cards/tcgv-card-team-coachwoman3-800.webp";
import tennisCoachImg from "@assets/images/cards/tcgv-card-team-coachman4-800.webp";
import eventCoachImg from "@assets/images/cards/tcgv-card-team-coachwoman4-800.webp";

// ICONS
import IconTrophy from "@components/icons/IconTrophy.astro";
import IconUsers from "@components/icons/IconUsers.astro";
import IconTarget from "@components/icons/IconTarget.astro";
import IconHeart from "@components/icons/IconHeart.astro";

// DATA
export const equipePedagogiqueSeo = {
  title: "Équipe pédagogique — TCGV",
  description:
    "Découvrez l’équipe pédagogique du Tennis Club du Grand Versailles : des enseignants diplômés et passionnés pour vous accompagner.",
};

export const hero = {
  title: "Notre Équipe Pédagogique",
  subtitle: "Des professionnels diplômés au service de votre progression",
  watermark: "Coaching",
};

export const introSubtitle = `L'équipe pédagogique réunit des enseignants diplômés d'État qui accompagnent les joueurs à chaque étape de leur pratique, de l'initiation à la compétition.

L'enseignement repose sur la régularité, la transmission et un suivi structuré au fil de la saison sportive.`;

export const coaches = [
  {
    name: "Alexandre Bertrand",
    title: "Directeur Technique & Enseignant Principal",
    specialties: ["Tennis", "Compétition", "Perfectionnement"],
    experience: "15 ans d'expérience",
    qualifications: ["DE Tennis", "CQP Padel", "Formation FFT Haut Niveau"],
    imageSrc: seniorManagerImg,
    description:
      "Ancien joueur classé -2/6, Alexandre forme les compétiteurs du club et supervise l'ensemble des programmes d'entraînement.",
  },
  {
    name: "Marie Laurent",
    title: "Enseignante Tennis & Responsable École de Tennis",
    specialties: ["Initiation", "Enfants", "Pédagogie"],
    experience: "12 ans d'expérience",
    qualifications: ["DE Tennis", "Formation Enseignement Jeunes", "BPJEPS"],
    imageSrc: schoolManagerImg,
    description:
      "Spécialisée dans l'enseignement aux jeunes, Marie développe une pédagogie ludique et progressive qui passionne les enfants.",
  },
  {
    name: "Julien Moreau",
    title: "Enseignant Padel & Tennis",
    specialties: ["Padel", "Tennis Loisir", "Adultes Débutants"],
    experience: "8 ans d'expérience",
    qualifications: ["CQP Padel", "DE Tennis", "Formation Technique Padel"],
    imageSrc: padelCoachImg,
    description:
      "Julien initie les nouveaux joueurs au padel avec une pédagogie progressive, adaptée aux premiers repères de jeu.",
  },
  {
    name: "Émilie Dupont",
    title: "Enseignante Tennis & Coach Mental",
    specialties: ["Tennis Adultes", "Préparation Mentale", "Perfectionnement"],
    experience: "10 ans d'expérience",
    qualifications: [
      "DE Tennis",
      "Formation Préparation Mentale",
      "Coaching Sportif",
    ],
    imageSrc: mentalCoachImg,
    description:
      "Émilie accompagne les joueurs adultes dans leur progression technique et mentale avec une approche globale du tennis.",
  },
  {
    name: "Nicolas Blanc",
    title: "Enseignant Tennis & Préparateur Physique",
    specialties: ["Tennis Compétition", "Préparation Physique", "Ados"],
    experience: "11 ans d'expérience",
    qualifications: [
      "DE Tennis",
      "Licence STAPS",
      "Formation Préparation Physique",
    ],
    imageSrc: healthCoachImg,
    description:
      "Nicolas articule travail technique et préparation physique pour accompagner les joueurs en compétition.",
  },
  {
    name: "Sophie Bernard",
    title: "Enseignante Tennis & Animatrice Stages",
    specialties: ["Tennis Tous Niveaux", "Stages Vacances", "Animation"],
    experience: "7 ans d'expérience",
    qualifications: ["DE Tennis", "BPJEPS", "Animation Sportive"],
    imageSrc: courseCoachImg,
    description:
      "Sophie anime les stages pendant les vacances scolaires et crée une ambiance conviviale pour tous les participants.",
  },
  {
    name: "David Rousseau",
    title: "Enseignant Padel & Tennis",
    specialties: [
      "Padel Perfectionnement",
      "Tennis Loisir",
      "Cours Collectifs",
    ],
    experience: "9 ans d'expérience",
    qualifications: ["CQP Padel", "DE Tennis", "Formation Technique Espagne"],
    imageSrc: tennisCoachImg,
    description:
      "Formé aux techniques modernes du padel, David perfectionne le jeu des joueurs confirmés avec rigueur et passion.",
  },
  {
    name: "Camille Petit",
    title: "Enseignante Tennis & Coordinatrice Animations",
    specialties: ["Tennis Féminin", "Animations Club", "Événements"],
    experience: "6 ans d'expérience",
    qualifications: ["DE Tennis", "BPJEPS", "Organisation Événementielle"],
    imageSrc: eventCoachImg,
    description:
      "Camille dynamise la vie du club en organisant tournois internes, animations et rencontres conviviales entre membres.",
  },
];

export const philosophy = [
  {
    title: "Pédagogie personnalisée",
    Icon: IconUsers,
    text: "Chaque joueur est unique. Nous adaptons notre enseignement à votre niveau, vos objectifs et votre rythme pour garantir une progression motivante.",
  },
  {
    title: "Technique moderne",
    Icon: IconTarget,
    text: "Nos méthodes s’appuient sur des repères techniques clairs, complétés par des outils vidéo et d’analyse selon les besoins.",
  },
  {
    title: "Bienveillance & motivation",
    Icon: IconHeart,
    text: "Le plaisir de jouer reste au cœur de notre démarche. Nous créons un environnement positif où chaque progrès est valorisé.",
  },
  {
    title: "Excellence & exigence",
    Icon: IconTrophy,
    text: "Nous visons l’excellence dans l’enseignement tout en respectant le niveau de chacun. Une exigence bienveillante, tournée vers le dépassement.",
  },
];

export const approachSteps = [
  {
    n: "1",
    title: "Évaluation initiale",
    text: "Chaque nouveau membre bénéficie d’un bilan technique personnalisé afin d’identifier le niveau, les points forts et les axes de progression prioritaires.",
  },
  {
    n: "2",
    title: "Programme personnalisé",
    text: "Votre enseignant construit un parcours sur mesure, en alternant cours collectifs (jeu, émulation) et cours particuliers (perfectionnement ciblé).",
  },
  {
    n: "3",
    title: "Suivi régulier",
    text: "Des points d’étape permettent d’ajuster le programme, de mesurer les progrès et de fixer de nouveaux objectifs motivants (avec outils vidéo si pertinent).",
  },
  {
    n: "4",
    title: "Mise en situation",
    text: "Matchs amicaux, tournois internes et situations réelles consolident les acquis et transforment l’entraînement en résultats concrets sur le terrain.",
  },
];

export const quote = {
  text: "Notre réussite, c’est votre progression. Chaque joueur qui franchit une nouvelle étape dans son jeu est pour nous la plus belle des récompenses.",
  author: "— Alexandre Bertrand, Directeur Technique",
};

export const joinSection = {
  title: "Prêt à progresser sur le court ?",
  bgKey: "default" as const,
  body: "Nos enseignants accompagnent joueurs débutants comme confirmés dans leur progression, dans une ambiance conviviale et exigeante.",
  note: "Enseignants diplômés d’État • Pédagogie personnalisée • Tous niveaux",
  ctas: [
    {
      label: "Découvrir les cours et entraînements",
      href: "/activites-cours",
      variant: "primary" as const,
    },
  ],
};
