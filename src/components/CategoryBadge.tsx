
import React from "react";
import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CategoryBadge = ({ category, className = "" }: CategoryBadgeProps) => {
  return (
    <Link 
      to={`/categories/${category.toLowerCase()}`}
      className={`inline-block text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded hover:bg-yc-orange hover:text-white transition-colors ${className}`}
    >
      {category}
    </Link>
  );
};

export default CategoryBadge;
