# 📱 Social Media Planner

Un planificateur de publications pour réseaux sociaux développé avec Angular. Ce projet permet de créer, planifier et gérer des posts avec un système de notifications et un calendrier visuel.

🔗 **[Voir la démo en ligne](https://social-media-planner-wine.vercel.app)**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Angular](https://img.shields.io/badge/Angular-19+-red)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📸 Aperçu

### Interface principale
Dashboard avec statistiques, calendrier et liste des posts planifiés.

### Dark Mode
Mode sombre/clair avec sauvegarde de la préférence utilisateur.

---

## ✨ Fonctionnalités

### 📝 Gestion des posts
- **Création** de posts avec texte, date/heure et aperçu d'image
- **Édition** des posts existants
- **Suppression** avec confirmation
- **Gestion des statuts** : Brouillon, Planifié, Publié

### 📊 Dashboard
- Statistiques en temps réel (total, par statut)
- Posts à publier cette semaine
- Dernier post créé
- Prochain post planifié

### 📅 Calendrier visuel
- Vue mensuelle avec navigation
- Posts affichés par date
- Codes couleur selon le statut
- Détails au clic sur un post

### 🔔 Notifications
- Vérification automatique toutes les minutes
- Alerte quand un post doit être publié
- Passage automatique au statut "Publié"

### 🔍 Filtres
- Filtrage par statut (Brouillon / Planifié / Publié)
- Checkboxes interactives
- Mise à jour en temps réel

### 🎨 Interface
- **Dark mode** avec toggle et sauvegarde de préférence
- Design **responsive** (mobile, tablette, desktop)
- Interface moderne et intuitive
- Animations et transitions fluides

### 💾 Persistance
- Sauvegarde automatique dans **localStorage**
- Données conservées après rechargement

---

## 🛠️ Technologies utilisées

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Langage
- **SCSS** - Styles avec variables CSS
- **RxJS** - Gestion de l'état réactif

### Architecture
- **Composants standalone** - Architecture moderne Angular
- **Services** - Logique métier séparée
- **Observables** - Communication réactive
- **ChangeDetectorRef** - Optimisation des performances

### Outils
- **Angular CLI** - Génération et build
- **Git & GitHub** - Versioning
- **Vercel** - Déploiement et hébergement

---

## 🚀 Installation et lancement

### Prérequis
- Node.js (v20+)
- npm (v11+)
- Angular CLI (v19+)

### Installation
```bash
# Cloner le repository
git clone https://github.com/PhanDev34000/Social-media-planner.git

# Aller dans le dossier
cd Social-media-planner

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

L'application sera accessible sur `http://localhost:4200`

### Build de production
```bash
ng build
```

Les fichiers de production seront dans `dist/social-planner/browser/`

---

## 📂 Structure du projet
```
src/app/
├── components/
│   ├── calendar-view/      # Calendrier mensuel
│   ├── dashboard/          # Tableau de bord et statistiques
│   ├── post-card/          # Carte d'affichage d'un post
│   ├── post-form/          # Formulaire création/édition
│   ├── post-list/          # Liste et filtres
│   └── theme-toggle/       # Toggle dark/light mode
├── models/
│   └── post.ts             # Interface Post
├── services/
│   ├── post.service.ts     # CRUD et logique métier
│   ├── notification.service.ts  # Système de notifications
│   └── theme.service.ts    # Gestion du thème
└── app.component.*         # Composant racine
```

---

## 🎯 Choix techniques

### Pourquoi localStorage ?
- **Simplicité** : MVP rapide sans backend
- **Fonctionnel** : Démontre toutes les compétences Angular
- **Évolutif** : Facile de remplacer par une API REST

### Architecture des composants
- **Composants standalone** : Architecture moderne Angular 19
- **Smart/Dumb pattern** : Séparation des responsabilités
- **Services injectables** : Logique métier centralisée

### Gestion de l'état
- **BehaviorSubject** : État réactif et partagé
- **ChangeDetectorRef** : Optimisation des performances
- **Observables** : Communication entre composants

---

## 🔮 Améliorations futures

- [ ] Backend Node.js + MongoDB
- [ ] Authentification utilisateur
- [ ] Intégration API réseaux sociaux (Twitter, LinkedIn)
- [ ] Upload d'images réel
- [ ] Export des posts (CSV, JSON)
- [ ] Recherche textuelle
- [ ] Tags et catégories
- [ ] Statistiques avancées

---

## 👨‍💻 Auteur

**PhanDev**
- GitHub: [@PhanDev34000](https://github.com/PhanDev34000)

---

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation à des fins éducatives et de portfolio.

---

## 🙏 Remerciements

Projet développé pour enrichir mon portfolio et démontrer mes compétences en développement frontend moderne.