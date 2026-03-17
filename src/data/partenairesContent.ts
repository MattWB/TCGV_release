import logoSportEquipFullSVG from "../components/partners/tcgv-logo-sportequippro-full.astro";
import logoBanqueRegionFullSVG from "../components/partners/tcgv-logo-banqueregion-full.astro";
import logoWellnessSpaFullSVG from "../components/partners/tcgv-logo-wellnessnspa-full.astro";
import logoTechhCourtMiniSVG from "../components/partners/tcgv-logo-techcourt-mini.astro";
import logoLumiereSportFullSVG from "../components/partners/tcgv-logo-lumieresport-full.astro";
import logoNutritionSportMiniSVG from "../components/partners/tcgv-logo-nutritionsport-mini.astro";
import logoClubCafeFullSVG from "../components/partners/tcgv-logo-clubcafe-full.astro";
import logoAssuranceAtoutMiniSVG from "../components/partners/tcgv-logo-assuranceatout-mini.astro";
import logoMediaSportMiniSVG from "../components/partners/tcgv-logo-mediasport-mini.astro";

import IconThumbUp from "@components/icons/IconThumbUp.astro";
import IconStar from "@components/icons/IconStar.astro";
import IconHeart from "@components/icons/IconHeart.astro";
import IconBuildingOffice from "@components/icons/IconBuildingOffice.astro";

export const partenairesContent = {
  hero: {
    title: "Nos Partenaires",
    subtitle: "Des collaborations qui font grandir notre club",
    watermark: "Partenaires",
    ctas: {
      primary: { label: "Voir les partenaires", href: "/contact" },
      secondary: { label: "Devenir partenaire", href: "/contact" },
    },
  },

  intro: {
    title: "Soutenez le Club",
    subtitle:
      "Le succès de notre club repose aussi sur la confiance et le soutien de nos partenaires. Entreprises locales, équipementiers et institutions nous accompagnent dans notre développement et partagent nos valeurs d'excellence et de convivialité.",
  },

  premium: {
    title: "Partenaires Premium",
    subtitle: "Nos partenaires stratégiques majeurs",
    watermark: "Premium",
    items: [
      {
        name: "SportEquip Pro",
        category: "Équipementier Officiel",
        description:
          "Leader européen de l'équipement sportif, SportEquip Pro nous fournit en matériel de qualité professionnelle et équipe nos enseignants.",
        Logo: logoSportEquipFullSVG,
        contributions: [
          "Équipement courts",
          "Matériel enseignants",
          "Pro-shop exclusif",
        ],
      },
      {
        name: "Banque Régionale",
        category: "Partenaire Financier Principal",
        description:
          "Partenaire historique du club depuis 10 ans, la Banque Régionale soutient nos projets d'investissement et nos tournois majeurs.",
        Logo: logoBanqueRegionFullSVG,
        contributions: [
          "Financement projets",
          "Sponsoring tournois",
          "Offres membres",
        ],
      },
      {
        name: "Wellness & Spa",
        category: "Partenaire Bien-être",
        description:
          "Centre de bien-être premium, Wellness & Spa offre des prestations exclusives à nos membres et soutient notre approche holistique du sport.",
        Logo: logoWellnessSpaFullSVG,
        contributions: [
          "Espace détente",
          "Soins exclusifs",
          "Tarifs préférentiels",
        ],
      },
    ],
  },

  official: {
    title: "Partenaires Officiels",
    subtitle: "Nos partenaires opérationnels et techniques",
    watermark: "Officiels",
    items: [
      {
        name: "TechCourt Solutions",
        category: "Maintenance & Innovation",
        description:
          "Spécialiste de l'entretien des surfaces de jeu et des équipements techniques.",
        Logo: logoTechhCourtMiniSVG,
      },
      {
        name: "Lumière & Sport",
        category: "Éclairage Professionnel",
        description:
          "Expert en éclairage sportif LED de dernière génération.",
        Logo: logoLumiereSportFullSVG,
      },
      {
        name: "Nutrition Sport+",
        category: "Conseil Nutritionnel",
        description:
          "Diététiciens spécialisés pour l'accompagnement de nos compétiteurs.",
        Logo: logoNutritionSportMiniSVG,
      },
      {
        name: "Club Café",
        category: "Restauration",
        description:
          "Fournisseur officiel de notre club-house pour une restauration de qualité.",
        Logo: logoClubCafeFullSVG,
      },
      {
        name: "Assurance Atout",
        category: "Protection & Assurance",
        description: "Solutions d'assurance adaptées aux sportifs et au club.",
        Logo: logoAssuranceAtoutMiniSVG,
      },
      {
        name: "Media Sport",
        category: "Communication",
        description:
          "Agence de communication spécialisée dans le sport et l'événementiel.",
        Logo: logoMediaSportMiniSVG,
      },
    ],
  },

  supporters: {
    title: "Supporters Locaux",
    subtitle: "Les commerces et entreprises de proximité qui nous soutiennent",
    watermark: "Support",
    thanks:
      "Un grand merci à tous nos supporters locaux pour leur confiance et leur engagement",
    items: [
      { name: "Boulangerie Dupont", logo: "BD" },
      { name: "Pharmacie Centrale", logo: "PC" },
      { name: "Garage Auto Plus", logo: "GA" },
      { name: "Coiffure Style", logo: "CS" },
      { name: "Restaurant Le Gourmet", logo: "RG" },
      { name: "Fleuriste Rose & Lys", logo: "FR" },
      { name: "Librairie du Centre", logo: "LC" },
      { name: "Optique Vision", logo: "OV" },
      { name: "Cabinet Dentaire", logo: "CD" },
      { name: "Immobilier Premium", logo: "IP" },
      { name: "Plomberie Services", logo: "PS" },
      { name: "Électricité Moderne", logo: "EM" },
    ],
  },

  benefits: {
    title: "Pourquoi devenir partenaire ?",
    subtitle: "Des opportunités concrètes pour développer votre visibilité",
    watermark: "Avantages",
    items: [
      {
        Icon: IconBuildingOffice,
        title: "Visibilité Premium",
        description:
          "Logo affiché sur nos supports de communication, site web, réseaux sociaux et lors de nos événements majeurs.",
      },
      {
        Icon: IconThumbUp,
        title: "Networking privilégié",
        description:
          "Accès à notre réseau de membres actifs et participation à nos événements club.",
      },
      {
        Icon: IconStar,
        title: "Avantages membres",
        description:
          "Offres spéciales pour vos collaborateurs : adhésions préférentielles, stages, cours et événements.",
      },
      {
        Icon: IconHeart,
        title: "Engagement local",
        description:
          "Associez votre marque aux valeurs positives du sport : excellence, dépassement de soi et esprit d'équipe.",
      },
    ],
  },

  plans: {
    title: "Formules de partenariat",
    note: "Chaque formule est personnalisable selon vos objectifs et votre budget",
    items: [
      { label: "Premium", price: "À partir de 5 000€", unit: "par an" },
      { label: "Officiel", price: "À partir de 2 000€", unit: "par an" },
      { label: "Supporter", price: "À partir de 500€", unit: "par an" },
    ],
  },

  joinSection: {
    title: "Devenez partenaire du club",
    body:
      "Rejoignez les entreprises qui partagent nos valeurs et accompagnent notre développement. Construisons ensemble un partenariat gagnant-gagnant.",
    note: "Dossier détaillé • Réponse sous 48h • Formules personnalisables",
    ctas: [
      {
        label: "Demander un dossier",
        href: "/contact",
        variant: "primary" as const,
        download: true,
      },
      { label: "Nous contacter", href: "/contact", variant: "alt" as const },
    ],
  },
};

export const partenairesSeo = {
  title: "Partenaires — Tennis Club du Grand Versailles",
  description:
    "Découvrez les partenaires du TCGV et les formules pour soutenir le club.",
};
