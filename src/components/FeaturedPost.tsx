
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../data/posts";
import CategoryBadge from "./CategoryBadge";

interface FeaturedPostProps {
  post: Post;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <div className="relative grid md:grid-cols-2 gap-6 bg-white rounded-lg overflow-hidden border border-gray-200 p-0 md:p-0">
      <div className="overflow-hidden h-full">
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      
      <div className="p-5 md:p-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <CategoryBadge category={post.category} />
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-yc-orange transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-6">{post.excerpt}</p>
        
        <div className="flex items-center">
          <img 
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <span className="block text-gray-900 font-medium">{post.author.name}</span>
            <span className="text-sm text-gray-500">{post.author.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
