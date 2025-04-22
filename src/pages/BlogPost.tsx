import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronLeft, Globe, MessageSquare, X, Menu, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import CategoryBadge from "@/components/CategoryBadge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useBlogSummaryStore, fetchBlogSummary } from "@/hooks/useBlogSummaryStore";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import ComplexitySlider from "@/components/ComplexitySlider";
import { useComplexityStore } from "@/hooks/useComplexityStore";
import { Skeleton } from "@/components/ui/skeleton";
import TranslationDropdown from "@/components/TranslationDropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogContent } from "@/services/feedService";
import { toast } from "sonner";
import axios from "axios";
import { API_ENDPOINTS } from '../config/api';

const BlogPost = () => {
  const location = useLocation();
  const blogData = location.state?.blogData;
  
  const { data: blogContent, isLoading: isLoadingContent } = useQuery({
    queryKey: ['blogContent', blogData?.link],
    queryFn: () => fetchBlogContent(blogData?.link),
    enabled: !!blogData?.link,
    meta: {
      onError: () => {
        toast.error("Failed to load blog content");
      }
    }
  });

  const [selectedText, setSelectedText] = useState<string>("");
  const [explanationContent, setExplanationContent] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);
  const [isSummaryMode, setIsSummaryMode] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState<string>("");
  const [translatedContent, setTranslatedContent] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const { 
    complexityLevel, 
    getArticleVersion, 
    isLoading,
    showOriginal 
  } = useComplexityStore();

  const { addSummary, getSummary } = useBlogSummaryStore();

  useEffect(() => {
    if (blogData) {
      setTranslatedTitle(blogData.title);
      setTranslatedContent(blogContent?.content || '');
    }
  }, [blogData, blogContent]);

  const handleSelection = (index: number) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedText(selection.toString());
    }
  };

  const handleExplainMore = async (index: number) => {
    if (selectedText) {
      try {
        const response = await axios.post(API_ENDPOINTS.FEEDS.GROQ, {
          text: selectedText,
          operation: "explain",
          mode: "default",
          target_language: "en",
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 1,
          top_k: 50
        });
        
        setExplanationContent(response.data.explanation);
        setShowExplanation(true);
        setSelectedParagraphIndex(index);
      } catch (error) {
        toast.error("Failed to get explanation");
        console.error("Error getting explanation:", error);
      }
    }
  };

  const closeExplanation = () => {
    setShowExplanation(false);
    setExplanationContent("");
    setSelectedParagraphIndex(null);
  };

  const handleShowSummary = async () => {
    if (isSummaryMode) {
      setIsSummaryMode(false);
      return;
    }

    if (!blogContent?.content) return;
    
    setIsLoadingSummary(true);
    try {
      const response = await axios.post(API_ENDPOINTS.FEEDS.GROQ, {
        text: blogContent.content,
        operation: "summarize",
        mode: "default",
        target_language: "en",
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 1,
        top_k: 50
      });
      
      setSummary(response.data.summary);
      setIsSummaryMode(true);
    } catch (error) {
      toast.error("Failed to generate summary");
      console.error("Error generating summary:", error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  if (!blogData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you are looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="text-yc-orange hover:text-yc-orange-dark transition-colors"
          >
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = blogContent?.content?.split("\n") || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to all posts
          </Link>
          <div className="flex items-center space-x-2">
            <CategoryBadge category={blogData.category || 'Uncategorized'} />
            <Button
              variant="outline"
              onClick={handleShowSummary}
              className="flex items-center gap-2"
            >
              {isLoadingSummary && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSummaryMode ? "Show Full Article" : "Show Summary"}
            </Button>
            <TranslationDropdown
              blogId={blogData.id}
              originalTitle={blogData.title}
              originalContent={blogContent?.content || ''}
              onTranslated={(title, content) => {
                setTranslatedTitle(title);
                setTranslatedContent(content);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 prose dark:prose-invert prose-lg max-w-none">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {translatedTitle}
            </h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <span className="mr-3">{format(new Date(blogData.pub_date), "MMMM d, yyyy")}</span>
            </div>
            
            {isLoadingContent ? (
              <div className="space-y-4 mt-8">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-40 w-full rounded" />
                <Skeleton className="h-6 w-5/6 rounded" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-4/5 rounded" />
                <Skeleton className="h-40 w-full rounded" />
              </div>
            ) : isSummaryMode ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Article Summary
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {summary}
                </p>
              </div>
            ) : (
              <>
                {translatedContent.split("\n").map((paragraph, index) => (
                  <div key={index}>
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <p 
                          onMouseUp={() => handleSelection(index)}
                          className="mb-4"
                        >
                          {paragraph}
                        </p>
                      </ContextMenuTrigger>
                        
                      <ContextMenuContent className="w-48 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                        <ContextMenuItem 
                          onClick={() => handleExplainMore(index)}
                          className="flex items-center cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Explain more
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                    
                    {showExplanation && selectedParagraphIndex === index && (
                      <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            Additional explanation
                          </h4>
                          <button 
                            onClick={closeExplanation}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {explanationContent}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  About this article
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {blogData.description}
                </p>
              </div>

              {blogData.media && blogData.media.length > 0 && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Featured Media
                  </h3>
                  <img 
                    src={blogData.media[0].url} 
                    alt={blogData.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
