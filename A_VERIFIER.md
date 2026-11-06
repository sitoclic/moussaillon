# Points à vérifier

Ce fichier liste honnêtement les chiffres et affirmations du site qui n'ont pas pu être confirmés par une source fiable, ou qui méritent une relecture humaine. Chaque point correspond à un marqueur `// À VÉRIFIER` dans le code ou à `statut: "a-verifier"` dans `content/chiffres.ts`.

Dernière mise à jour : 6 novembre 2026.

## Chiffres

| Où                                                                          | Affirmation                                                                                     | Pourquoi la vérifier                                                                                                                                                             |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content/chiffres.ts` (`imocaVoilure`), `content/fr/imoca.ts` (grand-voile) | Un IMOCA porte environ 260 m² au près et jusqu'à 600 m² au portant                              | Ordre de grandeur cité par la presse ; la jauge ne limite pas la surface, et elle varie selon les bateaux.                                                                       |
| `content/chiffres.ts` (`imocaDeplacement`)                                  | Un IMOCA récent pèse environ 8 tonnes                                                           | Estimation de presse, pas de valeur officielle.                                                                                                                                  |
| `content/chiffres.ts` (`record24hSolo`)                                     | Record de distance en 24 h en solitaire et en monocoque : plus de 615 milles                    | Sébastien Simon (615,33 milles) puis Nicolas Lunven auraient tous deux amélioré ce record pendant le Vendée Globe 2024-2025 ; vérifier le dernier record homologué par le WSSRC. |
| `content/fr/imoca.ts` (moteur)                                              | L'hélice est bloquée par un scellé et le moteur ne peut servir à avancer qu'en cas de sauvetage | Vérifier la formulation exacte dans l'avis de course du Vendée Globe.                                                                                                            |

## Contenus illustratifs (non factuels, à assumer comme tels)

- **Polaire du simulateur d'allures** (`lib/sailing.ts`) : polaire imaginaire, inspirée des ordres de grandeur d'un monocoque de course. Le texte le précise à l'écran.
- **Démonstration de la quille** (`components/interactive/ch2/Quille.tsx`) : modèle très simplifié de la gîte.
- **Bloc « Avant / après les foils »** : pourcentages de « coque dans l'eau » illustratifs, signalés à l'écran.
- **Comparaisons à terre** : arrondies (4 voitures ≈ 18 m, immeuble de 9 étages ≈ 29 m, etc.).

## Relecture conseillée

- Les coordonnées affichées sur la carte des escales sont décoratives et arrondies.
- Anecdotes du chapitre 3 (`content/fr/imoca.ts`) : sauvetage de Kevin Escoffier par Jean Le Cam (Vendée Globe 2020-2021), Vendée Globe de Conrad Colman sans carburant pour l'énergie (2016-2017), apparition des foils en 2016. Elles sont bien connues, mais une relecture des dates est conseillée.
