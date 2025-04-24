import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Settings, ChevronDown, Loader2 } from "lucide-react";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useFontSize } from "../hooks/useFontSize";
import { useCategoriesStore, fetchPostsByCategory } from "../hooks/useCategoriesStore";

interface HeaderProps {
  className?: string;
}

const CATEGORIES = ["Latest", "Startups", "Technology", "Business"];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { setFontSize, currentFontSize } = useFontSize();
  const { selectedCategory, setSelectedCategory, isLoading, setLoading } = useCategoriesStore();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    await fetchPostsByCategory(category);
    setLoading(false);
    navigate('/');
  };

  return (
    <header className={`border-b border-gray-200 dark:border-gray-800 py-4 bg-white dark:bg-gray-900 sticky top-0 z-50 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-yc-orange">Lens</span>
          </Link>
            
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
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
          </nav>

          <div className="flex items-center">
            {/* Desktop search, settings and theme toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {/* Settings Dropdown */}
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
                        <DropdownMenuItem onClick={() => handleFontSizeChange("small")}>
                          Small
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFontSizeChange("medium")}>
                          Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFontSizeChange("large")}>
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
              
              <ThemeToggle />
            </div>
            
            {/* Mobile - only theme toggle and hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Settings Button */}
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
                        <DropdownMenuItem onClick={() => handleFontSizeChange("small")}>
                          Small
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFontSizeChange("medium")}>
                          Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFontSizeChange("large")}>
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
              
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors py-2">
                Latest
              </Link>
              <Link to="/categories/startups" className="text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors py-2">
                Startups
              </Link>
              <Link to="/categories/technology" className="text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors py-2">
                Technology
              </Link>
              <Link to="/categories/business" className="text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors py-2">
                Business
              </Link>
              <button
                onClick={toggleSearch}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors py-2"
              >
                <Search size={18} className="mr-2" />
                <span>Search</span>
              </button>
            </div>
          </nav>
        )}

        {/* Search overlay */}
        {searchOpen && (
          <div className="py-3 animate-fade-in">
            <SearchBar onClose={toggleSearch} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
