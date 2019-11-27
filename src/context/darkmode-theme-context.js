import React from "react";

const themes = {
  dark: {
    backgroundColor: "hsl(210, 2%, 21%)",
    color: "#FFFFFF"
  },
  light: {
    backgroundColor: "#fffbf7",
    color: "#222222"
  }
};

const initialState = {
  dark: true,
  theme: themes.dark,
  toggle: () => {}
};
const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(true); // Default theme is dark

  // On mount, read the preferred theme from the persistence
  React.useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setDark(isDark);
  }, [dark]);

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setDark(isDark);
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
