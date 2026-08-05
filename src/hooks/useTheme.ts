import { ThemeContext, type ThemeContextValue } from "@/context/themeContext";
import { useContext } from "react";

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (ctx === null)
    throw new Error("useTheme must be used within a ThemeProvider");

  return ctx;
}
