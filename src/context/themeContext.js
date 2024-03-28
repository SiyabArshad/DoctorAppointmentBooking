import React, { createContext, useState, useContext } from "react";
import { lighttheme, darktheme } from "../utlis/theme";
export const ThemeContext = createContext({
  theme: lighttheme, // Initial theme
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lighttheme);

  const toggleTheme = () => {
    setTheme(theme === lighttheme ? darktheme : lighttheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
