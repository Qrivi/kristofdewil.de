export const themes = ["dark", "system", "light"] as const;
export const textSizes = ["smaller", "default", "larger"] as const;
type Theme = (typeof themes)[number];
type TextSize = (typeof textSizes)[number];

function readPreference(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

const storedTheme = readPreference("theme");
const storedTextSize = readPreference("textSize");
let theme: Theme = themes.includes(storedTheme as Theme) ? (storedTheme as Theme) : "system";
let textSize: TextSize = textSizes.includes(storedTextSize as TextSize) ? (storedTextSize as TextSize) : "default";

export function getPreferences() {
  return { theme, textSize };
}

export function applyPreferences(doc: Document = document) {
  doc.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches));
  doc.documentElement.dataset.textSize = textSize;
}

export function setPreference(key: string, value: string) {
  if (key === "theme" && themes.includes(value as Theme)) theme = value as Theme;
  else if (key === "textSize" && textSizes.includes(value as TextSize)) textSize = value as TextSize;
  else return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep preferences working for this visit when storage is unavailable.
  }
  applyPreferences();
}
