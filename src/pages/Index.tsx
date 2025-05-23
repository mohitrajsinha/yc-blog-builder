import React, { useEffect } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import InterestsDialog from "../components/InterestsDialog";
import { useInterestsStore } from "../hooks/useInterestsStore";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { 
    hasSelectedInterests, 
    searchResults, 
    isLoading, 
    error,
    selectedInterests,
    fetchSearchResults
  } = useInterestsStore();
  
  useEffect(() => {
    if (hasSelectedInterests || selectedInterests.length > 0) {
      fetchSearchResults();
    }
  }, [hasSelectedInterests, selectedInterests, fetchSearchResults]);

  const displayArticles = searchResults.map(result => ({
    ...result.item,
    media: result.media
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header className="shadow-sm bg-background/80 backdrop-blur-sm z-10" />
      
      {!hasSelectedInterests && <InterestsDialog />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Lens</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Essays and insights on news, technology, and current events from the Lens community.
          </p>
        </div>

        {!hasSelectedInterests && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Select your interests to see personalized content.
            </p>
          </div>
        )}

        {displayArticles[0] && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Post</h2>
            <BlogCard post={displayArticles[0]} />
          </section>
        )}

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {hasSelectedInterests ? 'Recommended Articles' : 'Latest Articles'}
            </h2>
          </div>
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading articles. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && displayArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.slice(1).map((article) => (
                <BlogCard
                  key={article.id}
                  post={article}
                />
              ))}
            </div>
          )}
        </section>

        <section className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Subscribe to Lens Newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest news and insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-yc-orange focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-yc-orange hover:bg-yc-orange-dark text-white font-medium px-6 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold text-foreground">Lens</span>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Your lens into the world of news, technology, and current events.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Categories</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Business</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Science</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">World</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Archive</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Writing</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Guidelines</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Newsletter</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">RSS Feed</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm text-center">
                © {new Date().getFullYear()} Lens. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
