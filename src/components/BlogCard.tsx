
import React from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";
import { FeedItem } from "@/services/feedService";
import { useInterestsStore } from "@/hooks/useInterestsStore";

interface BlogCardProps {
  post: FeedItem;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { addBlogDescription } = useInterestsStore();

  const handleClick = () => {
    if (post.description) {
      addBlogDescription(post.description);
    }
  };

  const getImageUrl = () => {
    if (!post.media) return null;
    
    // If media is an array of MediaItems
    if (Array.isArray(post.media) && post.media.length > 0) {
      return post.media[0]?.url;
    }
    
    // If media has images array
    if (post.media && typeof post.media === 'object' && 'images' in post.media && Array.isArray(post.media.images) && post.media.images.length > 0) {
      return post.media.images[0];
    }
    
    // If media has all_media array
    if (post.media && typeof post.media === 'object' && 'all_media' in post.media && Array.isArray(post.media.all_media) && post.media.all_media.length > 0) {
      return post.media.all_media[0].url;
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link 
        to={`/post/${post.id}`} 
        state={{ blogData: post }}
        className="overflow-hidden"
        onClick={handleClick}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">{post.pub_date}</span>
        </div>
        <Link 
          to={`/post/${post.id}`}
          state={{ blogData: post }}
          className="mb-2"
          onClick={handleClick}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-yc-orange transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
