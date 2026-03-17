# 🎾 TCGV — Tennis Club du Grand Versailles

Site vitrine du Tennis Club du Grand Versailles, conçu comme une plateforme moderne, performante et accessible, centrée sur l’information et l’expérience utilisateur.

## 🌐 Démo

👉 https://www.matthieumorel.com/projets/tcgv

---

## ✨ Aperçu

Le site permet de :

- Découvrir les activités et cours proposés par le club
- Consulter les actualités et événements
- Explorer les infrastructures et équipes
- Parcourir une boutique (catalogue produits)
- Accéder aux informations pratiques (tarifs, règlement, contact)

L’ensemble est pensé pour une navigation fluide, mobile-first, avec un minimum de JavaScript côté client.

---

## 🚀 Stack technique

- Astro (Static Site Generator)
- Tailwind CSS v4
- React (islands ciblées uniquement)
- Flowbite (composants interactifs JS, ex : carousel)

---

## ⚙️ Prérequis

- Node.js ≥ 20
- npm ≥ 10

---

## 📦 Installation

```bash
npm install
```

---

## 🧪 Développement

```bash
npm run dev
```

---

## 🏗️ Build production

```bash
npm run build
```

---

## 📁 Structure du projet (simplifiée)

```text
src/
  components/    → composants UI et sections
  layouts/       → layout global
  pages/         → routes Astro
  data/          → contenu structuré (single source of truth)
  assets/        → styles, images, scripts

public/          → assets statiques
```

---

## 🎯 Objectifs du projet

- Performance (SSG + JS minimal)
- Design system cohérent (TCGV)
- Accessibilité et responsive design
- Maintenabilité (architecture modulaire Astro)

---

## ⚠️ Notes

- Le projet inclut volontairement des **flows simulés** (connexion, inscription, contact)
- Ces interactions utilisent des toasts et ne reposent pas sur un backend réel
- Cette approche est intentionnelle pour un projet vitrine statique

---

## 🧩 Configuration

Le site utilise une URL configurable via variables d’environnement :

```bash
PUBLIC_SITE_URL=https://www.matthieumorel.com/projets/tcgv
```

---

## 📄 Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE`.
