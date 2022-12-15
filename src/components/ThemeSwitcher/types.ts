export enum EThemes {
  dark = "dark",
  light = "light",
}


export type TThemeContext = {
  theme?: EThemes
  setTheme?: (v: EThemes) => void
}