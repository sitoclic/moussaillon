/**
 * Script exécuté avant le premier affichage : applique le thème (jour / quart
 * de nuit) choisi par le lecteur, ou celui de son système, sans clignotement.
 */
export const THEME_KEY = "moussaillon:theme";

const code = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="night"&&t!=="day"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"night":"day"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
