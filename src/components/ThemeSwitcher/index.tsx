import { createContext, FC, useContext, useState } from "react";

import { EThemes, TThemeContext } from "./types";

const ThemeContext = createContext<TThemeContext>({});

export const useTheme = (): TThemeContext => useContext(ThemeContext);

const ThemeSwitcher: FC = ({ children }) => {
  const [theme, setTheme] = useState(EThemes.dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
