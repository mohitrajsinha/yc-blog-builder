
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface MobileMenuProps {
  toggleSearch: () => void;
}

export const MobileMenu = ({ toggleSearch }: MobileMenuProps) => {
  return (
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
  );
};
