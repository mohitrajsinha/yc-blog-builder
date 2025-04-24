
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { CategoryDropdown } from "./header/CategoryDropdown";
import { SettingsDropdown } from "./header/SettingsDropdown";
import { MobileMenu } from "./header/MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "./SearchBar";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
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
            <CategoryDropdown />
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
              <SettingsDropdown />
              <ThemeToggle />
            </div>
            
            {/* Mobile - only theme toggle and hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              <SettingsDropdown />
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
        {mobileMenuOpen && <MobileMenu toggleSearch={toggleSearch} />}

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
