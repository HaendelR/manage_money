# Manage Money

Application de gestion financière personnelle développée avec une architecture Full Stack et mobile.

> **Statut :** projet personnel en cours de développement.

## Présentation

Manage Money est une application conçue pour permettre aux utilisateurs de gérer leurs finances personnelles, notamment leurs comptes, portefeuilles et transactions.

Le projet est développé avec une approche orientée **maintenabilité, séparation des responsabilités et évolutivité**, avec une architecture monorepo permettant de partager certains composants et types entre les différentes applications.

## Architecture

Le projet est organisé en monorepo :

```text
manage_money/
├── apps/
│   ├── api/        # API backend
│   ├── web/        # Application web
│   └── mobile/     # Application mobile
│
├── packages/
│   ├── database/   # Schéma et accès à la base de données
│   ├── types/      # Types partagés
│   └── utils/      # Utilitaires partagés
│
└── ...
```

Cette organisation permet de séparer clairement les responsabilités tout en facilitant le partage de code et de types entre les différentes applications.

## Stack technique

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL
* Drizzle ORM
* Zod
* JWT
* bcrypt

### Web

* Next.js
* React
* TypeScript

### Mobile

* React Native
* Expo

### Infrastructure & outils

* Docker
* pnpm
* Git

## Fonctionnalités

Les principales fonctionnalités prévues ou en cours de développement comprennent :

* Authentification et gestion des utilisateurs
* Gestion des wallets / comptes
* Gestion des transactions
* Catégorisation des opérations
* API REST
* Validation des données
* Authentification JWT avec gestion des refresh tokens
* Application web
* Application mobile

## Principes techniques

Le projet est développé avec une attention particulière portée à :

* la séparation des responsabilités ;
* la validation des données ;
* la gestion des erreurs ;
* la sécurité de l'authentification ;
* la réutilisation du code ;
* la maintenabilité ;
* l'évolutivité de l'architecture.

Le projet étant encore en développement, certaines fonctionnalités et parties de l'interface sont susceptibles d'évoluer.

## Installation

### Prérequis

* Node.js
* pnpm
* Docker

### Installation des dépendances

```bash
pnpm install
```

### Base de données

Le projet utilise PostgreSQL. Une configuration Docker est prévue pour faciliter la mise en place de l'environnement de développement.

### Variables d'environnement

Créer les fichiers `.env` nécessaires à partir des exemples fournis dans les différentes applications.

Ne jamais versionner de secrets, mots de passe ou clés privées dans le dépôt.

## État du projet

Le projet est actuellement en cours de développement.

L'architecture principale et la structure des différentes applications sont en place. Les fonctionnalités sont ajoutées progressivement.

## Objectif

L'objectif est de construire une application complète permettant de gérer ses finances depuis le web et le mobile, tout en conservant une architecture suffisamment claire et évolutive pour accompagner l'ajout de nouvelles fonctionnalités.

---

**Projet personnel — Henintsoa Haendel Rafaralahy**
