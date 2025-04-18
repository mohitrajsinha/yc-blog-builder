
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../data/posts";
import CategoryBadge from "./CategoryBadge";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/post/${post.slug}`} className="overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
        <Link to={`/post/${post.slug}`} className="mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yc-orange transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <div className="flex items-center mt-auto">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-700">{post.author.name}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
