import type { DayEvent } from "@/components/interactive/ch8/JourneeType";

/**
 * Une journée type d'un solitaire dans les mers du Sud (chapitre 8).
 * Reconstitution pédagogique, inspirée des récits de skippers :
 * chaque journée en mer est différente !
 */
export const journeeType: DayEvent[] = [
  {
    time: "00h00",
    icon: "🌙",
    title: "Quart de nuit",
    text: "Le bateau file dans le noir, guidé par le pilote automatique. Le skipper surveille les écrans, l'AIS et le radar, puis s'accorde une sieste de vingt minutes, réveil réglé.",
  },
  {
    time: "02h30",
    icon: "⚠️",
    title: "Alarme !",
    text: "Le vent a forci d'un coup. Le skipper enfile son ciré et son harnais en quelques secondes, sort dans la nuit glacée et réduit la voilure à la frontale. Trente minutes d'efforts, puis retour à l'abri, trempé.",
  },
  {
    time: "05h00",
    icon: "🛰️",
    title: "La météo du jour",
    text: "Nouveaux fichiers météo téléchargés par satellite. Le skipper les compare avec sa position et ses polaires, et décide de sa route pour les 24 prochaines heures.",
  },
  {
    time: "07h30",
    icon: "🥣",
    title: "Petit-déjeuner",
    text: "Eau chaude, porridge lyophilisé, café. Sur un bateau qui bouge en tous sens, faire chauffer de l'eau sans se brûler est déjà une petite victoire.",
  },
  {
    time: "09h00",
    icon: "🔧",
    title: "Le tour du bateau",
    text: "Inspection quotidienne : cordages usés, fixations, voiles, safrans, foils, mât. Mieux vaut repérer une petite usure aujourd'hui qu'une grosse casse demain.",
  },
  {
    time: "12h00",
    icon: "📞",
    title: "Contact avec la terre",
    text: "Un appel en visio avec l'équipe technique, un message pour la famille, une vidéo pour le public. Le bateau est relié au reste du monde par satellite.",
  },
  {
    time: "13h00",
    icon: "🍲",
    title: "Déjeuner",
    text: "Un plat lyophilisé réhydraté, mangé dans le sac ou dans un bol, calé contre une cloison. Dans le froid, le corps a besoin de beaucoup de calories.",
  },
  {
    time: "15h00",
    icon: "😴",
    title: "Siestes en série",
    text: "Quelques siestes de 20 à 40 minutes, dans le siège-baquet, en ciré. Le corps apprend à s'endormir vite et à se réveiller au moindre bruit inhabituel.",
  },
  {
    time: "18h00",
    icon: "⛵",
    title: "Changement de voile",
    text: "Le vent tourne : il faut changer de voile d'avant. Une manœuvre longue et physique, à faire avant la nuit, de préférence.",
  },
  {
    time: "20h00",
    icon: "🧂",
    title: "Toilette et entretien",
    text: "Lingettes, crème contre les irritations du sel, vêtements secs si possible. Le dessalinisateur tourne pour refaire le plein d'eau douce.",
  },
  {
    time: "22h00",
    icon: "🌌",
    title: "Nuit sous les étoiles",
    text: "Quand le ciel est dégagé, un ciel étoilé comme on n'en voit jamais à terre. Puis le cycle recommence : veille, sieste, veille, sieste…",
  },
];
