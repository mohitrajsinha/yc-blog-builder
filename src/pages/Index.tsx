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
  
  // Fetch search results on mount if there are stored interests
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
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Y Combinator Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Essays and insights on startups, technology, and building the future from the Y Combinator community.
          </p>
        </div>

        {/* Empty state */}
        {!hasSelectedInterests && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Select your interests to see personalized content.
            </p>
          </div>
        )}

        {/* Featured Post */}
        {displayArticles[0] && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Post</h2>
            <BlogCard post={displayArticles[0]} />
          </section>
        )}

        {/* Recent Posts */}
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

        {/* Newsletter */}
        <section className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest startup advice and YC news delivered to your inbox.
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
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-yc-orange">Y Combinator</span>
                <span className="ml-1 text-xl font-normal text-foreground">Blog</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Insights and advice for startup founders from Y Combinator.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">Categories</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Startups</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Technology</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Fundraising</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Growth</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">YC Library</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Startup School</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Work at a Startup</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Apply to YC</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">Y Combinator</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Companies</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Events</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-yc-orange transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} Y Combinator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
