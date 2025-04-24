
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoriesStore, fetchPostsByCategory } from "@/hooks/useCategoriesStore";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Latest", "Startups", "Technology", "Business"];

export const CategoryDropdown = () => {
  const { selectedCategory, setSelectedCategory, isLoading, setLoading } = useCategoriesStore();
  const navigate = useNavigate();

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    await fetchPostsByCategory(category);
    setLoading(false);
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {selectedCategory || 'Categories'} <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {CATEGORIES.map((category) => (
          <DropdownMenuItem key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
