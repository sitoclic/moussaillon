# Points à vérifier

Ce fichier liste honnêtement les chiffres et affirmations du site qui n'ont pas pu être confirmés par une source fiable, ou qui méritent une relecture humaine. Chaque point correspond à un marqueur `// À VÉRIFIER` dans le code ou à `statut: "a-verifier"` dans `content/chiffres.ts`.

Dernière mise à jour : 6 novembre 2026.

## Chiffres

| Où                                                                          | Affirmation                                                                                                             | Pourquoi la vérifier                                                                                                                                                              |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content/chiffres.ts` (`imocaVoilure`), `content/fr/imoca.ts` (grand-voile) | Un IMOCA porte environ 260 m² au près et jusqu'à 600 m² au portant                                                      | Ordre de grandeur cité par la presse ; la jauge ne limite pas la surface, et elle varie selon les bateaux.                                                                        |
| `content/chiffres.ts` (`imocaDeplacement`)                                  | Un IMOCA récent pèse environ 8 tonnes                                                                                   | Estimation de presse, pas de valeur officielle.                                                                                                                                   |
| `content/chiffres.ts` (`record24hSolo`)                                     | Record de distance en 24 h en solitaire et en monocoque : plus de 615 milles                                            | Sébastien Simon (615,33 milles) puis Nicolas Lunven auraient tous deux amélioré ce record pendant le Vendée Globe 2024-2025 ; vérifier le dernier record homologué par le WSSRC.  |
| `content/fr/classes.ts` (`price`)                                           | Prix des bateaux (Mini, Figaro, Class40, Ocean Fifty, IMOCA, Ultim)                                                     | Aucune source fiable trouvée pour les prix neufs : ce sont des ordres de grandeur, présentés comme tels à l'écran.                                                                |
| `content/fr/classes.ts` (`topSpeed`)                                        | Vitesses de pointe par classe                                                                                           | Ordres de grandeur, très variables selon les bateaux et les conditions.                                                                                                           |
| `content/fr/classes.ts` (`mastLabel`)                                       | Hauteur de mât du Mini (≈ 12 m), du Figaro 3 (≈ 15 m), de l'Ocean Fifty (23,77 m max) et de l'Ultim (≈ 35 m)            | Mini : la jauge limite tirant d'air + tirant d'eau à 14 m. Figaro 3 : valeur non trouvée. Ocean Fifty : source secondaire. Ultim : la jauge limite le mât à 120 % de la longueur. |
| `content/fr/chapters/navigation.mdx`                                        | Sur la Route du Rhum, seuls les Ultim ont droit à un routeur à terre                                                    | Information tirée de la presse (Filovent) ; à confirmer dans l'avis de course 2026.                                                                                               |
| `content/fr/chapters/vendee-globe.mdx`                                      | Un marin peut revenir aux Sables-d'Olonne pour réparer « pendant les premiers jours »                                   | Le règlement fixe un délai précis (souvent cité : 10 jours) ; vérifier l'avis de course 2028.                                                                                     |
| `content/fr/chapters/vendee-globe.mdx`                                      | « Plus de personnes sont allées dans l'espace que de marins n'ont bouclé un tour du monde en solitaire et sans escale » | Formule très répandue, présentée comme « on dit souvent » ; les chiffres exacts évoluent.                                                                                         |
| `content/fr/courses.ts` (The Ocean Race)                                    | Édition 2027 : départ d'Alicante le 17 janvier 2027, escale à Auckland, arrivée en mer Rouge                            | Parcours encore provisoire selon l'organisateur.                                                                                                                                  |
| `content/fr/courses.ts` (The Transat CIC)                                   | Rythme de quatre ans                                                                                                    | Le calendrier a varié ; vérifier la date de la prochaine édition.                                                                                                                 |
| `content/fr/vendee-globe.ts`                                                | Positions des étapes sur la carte                                                                                       | Approximatives, choisies pour l'illustration.                                                                                                                                     |
| `content/fr/imoca.ts` (moteur)                                              | L'hélice est bloquée par un scellé et le moteur ne peut servir à avancer qu'en cas de sauvetage                         | Vérifier la formulation exacte dans l'avis de course du Vendée Globe.                                                                                                             |

## Contenus illustratifs (non factuels, à assumer comme tels)

- **Polaire du simulateur d'allures** (`lib/sailing.ts`) : polaire imaginaire, inspirée des ordres de grandeur d'un monocoque de course. Le texte le précise à l'écran.
- **Démonstration de la quille** (`components/interactive/ch2/Quille.tsx`) : modèle très simplifié de la gîte.
- **Bloc « Avant / après les foils »** : pourcentages de « coque dans l'eau » illustratifs, signalés à l'écran.
- **Comparaisons à terre** : arrondies (4 voitures ≈ 18 m, immeuble de 9 étages ≈ 29 m, etc.).

## Relecture conseillée

- **Chapitre 8** : la « journée type » (`content/fr/vie-a-bord.ts`) est une reconstitution pédagogique, pas le récit d'un skipper précis. Les besoins caloriques sont décrits sans chiffre, faute de source fiable.
- **Frise et anecdotes des chapitres 7 à 9** (`content/fr/frise.ts`, `content/fr/vendee-globe.ts`) : dates et faits connus (Slocum 1895-1898, Golden Globe 1968-1969, Route du Rhum 1978 gagnée de 98 secondes, Vendée Globe 1989-1990 en 109 jours, Arthaud 1990, Jules Verne 1993 en 79 jours, sauvetages de 1996-1997 et 2020, MacArthur 2005, records de 2017, Caudrelier 2024). Une relecture des chiffres est conseillée.
- **Réparations célèbres** (chapitre 8) : Bertrand de Broc (1992-1993), Yves Parlier (2000-2001), Pip Hare (2020-2021).

- Les coordonnées affichées sur la carte des escales sont décoratives et arrondies.
- Anecdotes du chapitre 3 (`content/fr/imoca.ts`) : sauvetage de Kevin Escoffier par Jean Le Cam (Vendée Globe 2020-2021), Vendée Globe de Conrad Colman sans carburant pour l'énergie (2016-2017), apparition des foils en 2016. Elles sont bien connues, mais une relecture des dates est conseillée.
