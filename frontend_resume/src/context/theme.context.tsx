import React, { createContext, useState } from "react";

interface IThemeContextInterfase {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
export const ThemeContext = createContext<IThemeContextInterfase>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface IThemeContextProviderProps{
    children: React.ReactNode;
}

const IThemeContextProvider = ({ children }: IThemeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode: () => void = () => {
    setDarkMode((prevState) => !prevState);
  };

  return <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>{children}</ThemeContext.Provider>;
};
export default IThemeContextProvider;
