
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useFontSize } from "@/hooks/useFontSize";

export const SettingsDropdown = () => {
  const { setFontSize, currentFontSize } = useFontSize();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors">
          <Settings size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Font Size ({currentFontSize})</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setFontSize("small")}>
                Small
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("medium")}>
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFontSize("large")}>
                Large
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem asChild>
          <Link to="/complexity-settings" className="w-full">
            Content Complexity
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
