
import { useState, useEffect, createContext, useContext } from "react";

type FontSizeType = "small" | "medium" | "large";

interface FontSizeContextType {
  fontSize: FontSizeType;
  setFontSize: (size: string) => void;
  currentFontSize: string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<FontSizeType>(() => {
    const savedSize = localStorage.getItem("fontSize");
    return (savedSize as FontSizeType) || "medium";
  });

  const setFontSize = (size: string) => {
    if (size === "small" || size === "medium" || size === "large") {
      setFontSizeState(size);
      localStorage.setItem("fontSize", size);
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove("text-small", "text-medium", "text-large");
    document.documentElement.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  const currentFontSize = fontSize.charAt(0).toUpperCase() + fontSize.slice(1);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, currentFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};
