import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { TypesCoques } from "@/components/interactive/ch4/TypesCoques";

/**
 * Les grandes interactions, utilisables dans les chapitres MDX.
 * Chacune est chargée à la demande (code séparé, via next/dynamic) :
 * une page ne télécharge que les interactions qu'elle utilise.
 */

// Chapitre 1
const BabordTribord = dynamic(() =>
  import("@/components/interactive/ch1/BabordTribord").then((m) => m.BabordTribord),
);
const Noeuds = dynamic(() => import("@/components/interactive/ch1/Noeuds").then((m) => m.Noeuds));
const AuVent = dynamic(() => import("@/components/interactive/ch1/AuVent").then((m) => m.AuVent));
// Chapitre 2
const VoileAile = dynamic(() => import("@/components/interactive/ch2/VoileAile").then((m) => m.VoileAile));
const SimulateurAllures = dynamic(() =>
  import("@/components/interactive/ch2/SimulateurAllures").then((m) => m.SimulateurAllures),
);
const Manoeuvres = dynamic(() => import("@/components/interactive/ch2/Manoeuvres").then((m) => m.Manoeuvres));
const Quille = dynamic(() => import("@/components/interactive/ch2/Quille").then((m) => m.Quille));
// Chapitre 3
const AnatomieImoca = dynamic(() =>
  import("@/components/interactive/ch3/AnatomieImoca").then((m) => m.AnatomieImoca),
);
const Foils = dynamic(() => import("@/components/interactive/ch3/Foils").then((m) => m.Foils));
// Chapitre 4
const Silhouettes = dynamic(() =>
  import("@/components/interactive/ch4/Silhouettes").then((m) => m.Silhouettes),
);
const Comparateur = dynamic(() =>
  import("@/components/interactive/ch4/Comparateur").then((m) => m.Comparateur),
);
// Chapitre 5
const BeaufortVivant = dynamic(() =>
  import("@/components/interactive/ch5/BeaufortVivant").then((m) => m.BeaufortVivant),
);
const MeteoCarte = dynamic(() => import("@/components/interactive/ch5/MeteoCarte").then((m) => m.MeteoCarte));
const JeuRoutage = dynamic(() => import("@/components/interactive/ch5/JeuRoutage").then((m) => m.JeuRoutage));
// Chapitre 6
const Coordonnees = dynamic(() =>
  import("@/components/interactive/ch6/Coordonnees").then((m) => m.Coordonnees),
);
const CapRoute = dynamic(() => import("@/components/interactive/ch6/CapRoute").then((m) => m.CapRoute));

export function getInteractives(lang: Locale) {
  const content = getContent(lang);
  return {
    BabordTribord,
    Noeuds,
    AuVent,
    VoileAile,
    SimulateurAllures,
    Manoeuvres,
    Quille,
    QuillePendulaire: () => <Quille canting />,
    AnatomieImoca: () => <AnatomieImoca parts={content.imocaParts} />,
    Foils,
    Silhouettes: () => <Silhouettes classes={content.raceClasses} />,
    Comparateur: () => <Comparateur classes={content.raceClasses} />,
    TypesCoques: () => <TypesCoques labels={content.ui.hullTypes} />,
    BeaufortVivant: () => <BeaufortVivant levels={content.beaufort} />,
    MeteoCarte,
    JeuRoutage,
    Coordonnees,
    CapRoute,
  };
}
