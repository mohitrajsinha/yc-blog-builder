
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Button 
      variant="ghost" 
      size={isMobile ? "sm" : "icon"}
      onClick={toggleTheme}
      className="gap-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <>
          <Moon size={isMobile ? 16 : 20} />
          {isMobile && <span>Dark mode</span>}
        </>
      ) : (
        <>
          <Sun size={isMobile ? 16 : 20} />
          {isMobile && <span>Light mode</span>}
        </>
      )}
    </Button>
  );
}
