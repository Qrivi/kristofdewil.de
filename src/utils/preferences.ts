export const colorThemes = ["system", "light", "dark"] as const;
type ColorTheme = (typeof colorThemes)[number];
export const textSizes = ["default", "smaller", "larger"] as const;
type TextSize = (typeof textSizes)[number];

export const colorThemeKey = "colorTheme";
export const textSizeKey = "textSize";

function readPreference(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

const storedTheme = readPreference(colorThemeKey);
let colorTheme: ColorTheme = colorThemes.includes(storedTheme as ColorTheme) ? (storedTheme as ColorTheme) : "system";
const storedTextSize = readPreference(textSizeKey);
let textSize: TextSize = textSizes.includes(storedTextSize as TextSize) ? (storedTextSize as TextSize) : "default";

export function getPreferences() {
  return { [colorThemeKey]: colorTheme, [textSizeKey]: textSize };
}

export function applyPreferences(doc: Document = document) {
  doc.documentElement.classList.toggle("dark", colorTheme === "dark" || (colorTheme === "system" && matchMedia("(prefers-color-scheme: dark)").matches));
  doc.documentElement.classList.toggle("text-size-smaller", textSize === "smaller");
  doc.documentElement.classList.toggle("text-size-larger", textSize === "larger");
}

export function setPreference(key: string, value: string) {
  if (key === colorThemeKey && colorThemes.includes(value as ColorTheme)) colorTheme = value as ColorTheme;
  else if (key === textSizeKey && textSizes.includes(value as TextSize)) textSize = value as TextSize;
  else return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep preferences working for this visit when storage is unavailable.
  }
  applyPreferences();
}
