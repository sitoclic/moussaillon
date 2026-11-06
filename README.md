# Moussaillon ⚓

> Du ponton au cap Horn, la course au large expliquée à ceux qui n'ont jamais mis le pied sur un bateau.

**Moussaillon** est un site vitrine, en français, qui fonctionne comme un documentaire interactif. On y apprend tout sur la course au large : les bateaux dans le détail, la météo, la navigation, la vie à bord, les grandes courses et leurs légendes, et les astuces des pros.

Le site est **100 % statique** : pas de compte, pas de base de données, pas de serveur, pas de pisteur. La progression du lecteur (escales visitées, scores aux quiz) reste dans son navigateur (`localStorage`), et le site marche parfaitement sans.

## Lancer le site en local

Il faut [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site sur http://localhost:3000
```

Autres commandes :

| Commande         | Rôle                                                          |
| ---------------- | ------------------------------------------------------------- |
| `npm run build`  | construit la version de production (à faire avant de pousser) |
| `npm run start`  | sert la version construite                                    |
| `npm run lint`   | vérifie le code (ESLint)                                      |
| `npm run format` | met en forme le code (Prettier)                               |

## Technologies

- [Next.js](https://nextjs.org) (App Router) + TypeScript, en génération statique
- Tailwind CSS 4 pour le style
- Framer Motion pour les animations (le site respecte le réglage « réduire les animations » du système)
- MDX pour la rédaction des chapitres
- Dessins en SVG faits main (bateaux, cartes, mascotte) : aucune image protégée

## Structure du projet

```
app/
  [lang]/                    pages, préfixées par la langue (/fr/…)
    page.tsx                 accueil : mer animée + carte des escales
    chapters/[slug]/         les 11 escales (/fr/chapters/the-dock…)
    glossary/                glossaire avec recherche
    about/                   à propos et sources
  global-not-found.tsx       page 404 « Un homme à la mer ! »
  globals.css                design system (couleurs jour / quart de nuit, typographie)
components/
  ui/                        briques de base : Button, Card, Terme, Quiz, encadrés…
  mascotte/                  le Moussaillon (SVG)
  decor/                     vagues, voilier, rose des vents
  home/                      accueil (héros, carte du voyage)
  navigation/                en-tête, menu des escales, pied de page, bouton nuit
  chapter/                   suivi de lecture
  mdx/                       composants utilisables dans les chapitres
content/                     ← TOUS LES TEXTES SONT ICI
  types.ts                   formes attendues des contenus
  chiffres.ts                chiffres clés et records, avec source et date
  fr/
    ui.ts                    textes de l'interface (boutons, menus…)
    chapters.ts              liste des escales, « Ce qu'il faut retenir »
    chapters/*.mdx           le texte de chaque chapitre
    glossary.ts              le glossaire (source des infobulles)
    quiz.ts                  les mini-quiz
lib/                         utilitaires (langues, progression)
A_VERIFIER.md                points à vérifier avant publication
```

## Modifier les contenus

Tout le texte est dans le dossier **`content/`**. Pas besoin de toucher aux composants.

- **Le texte d'un chapitre** : `content/fr/chapters/<slug>.mdx`. C'est du Markdown classique (`**gras**`, `## Titre`, listes…), plus quelques balises spéciales :
  - `<Terme>bâbord</Terme>` : souligne le mot et affiche sa définition (tirée du glossaire). Si le mot affiché diffère de l'entrée du glossaire : `<Terme id="noeud">nœuds</Terme>`.
  - `<Bulle type="question">…</Bulle>` : le moussaillon pose une question de débutant. `<Bulle>…</Bulle>` : son conseil.
  - `<Astuce title="…">…</Astuce>` : encadré « Astuce de pro ».
  - `<ATerre>…</ATerre>` : comparaison avec la vie à terre.
- **Le titre, l'accroche, « Ce qu'il faut retenir »** : `content/fr/chapters.ts`.
- **Un mot du glossaire** : `content/fr/glossary.ts`. Chaque entrée a un `id` (sans accent), un `term`, une `definition` et un `theme`.
- **Un quiz** : `content/fr/quiz.ts`. `answer` est la position de la bonne réponse, en comptant à partir de 0.
- **Un chiffre ou un record** : `content/chiffres.ts`, toujours avec sa source et sa date de vérification.

Après une modification, lance `npm run build` : si une faute de frappe casse quelque chose, le build le signale.

### L'encadré « En ce moment »

L'actualité de la course au large (course en cours, prochain départ) tient dans un seul fichier, `content/fr/actualites.ts` (ajouté au jalon 4). Il suffit de modifier le texte et la date, puis de pousser sur GitHub : Vercel redéploie tout seul.

## Langues

Les adresses sont en anglais et préfixées par la langue (`/fr/chapters/the-dock`), pour pouvoir traduire le site plus tard. Pour ajouter une langue (l'anglais, par exemple) :

1. ajouter `"en"` dans `lib/i18n.ts` ;
2. copier `content/fr/` en `content/en/` et traduire ;
3. référencer la langue dans `content/index.ts` et `components/providers/I18nProvider.tsx`.

## Déploiement

Le code est sur GitHub, et Vercel le déploie : chaque `git push` sur la branche `main` met le site à jour automatiquement.
