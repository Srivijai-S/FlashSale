import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// ✅ Create and export ThemeContext
export const ThemeContext = createContext(null);

const giftShopTheme = createTheme({
  palette: {
    background: { default: "#FFB6C1" },
    // text: { primary: "#fff" },
  },
});

const snackShopTheme = createTheme({
  palette: {
    background: { default: "#8FBC8F" }, // Dark Sea Green for Snake Shop
    // text: { primary: "#fff" },
  },
});

export const ThemeContextProvider = ({ children }) => {
  const [isGiftShop, setIsGiftShop] = useState(true);

  const theme = useMemo(
    () => (isGiftShop ? giftShopTheme : snackShopTheme),
    [isGiftShop]
  );

  return (
    <ThemeContext.Provider value={{ isGiftShop, setIsGiftShop }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
