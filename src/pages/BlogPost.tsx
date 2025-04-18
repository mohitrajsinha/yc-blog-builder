
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Globe, MessageSquare, X, Menu, Loader2 } from "lucide-react";
import { posts } from "../data/posts";
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(post => post.slug === slug);

  const [selectedText, setSelectedText] = useState<string>("");
  const [explanationContent, setExplanationContent] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);
  const [isSummaryMode, setIsSummaryMode] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState<string>("");
  const [translatedContent, setTranslatedContent] = useState<string>("");

  const { 
    complexityLevel, 
    getArticleVersion, 
    isLoading,
    showOriginal 
  } = useComplexityStore();

  const { addSummary, getSummary } = useBlogSummaryStore();

  const articleVersion = post ? getArticleVersion(post.id.toString()) : null;

  useEffect(() => {
    if (post && !post.content) {
      post.content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
    }

    // Initialize translated content with the original content
    if (post) {
      setTranslatedTitle(post.title);
      setTranslatedContent(post.content);
    }
  }, [post]);

  // Use either the translated content or the original/modified content based on complexity settings
  const displayContent = {
    title: translatedTitle || (showOriginal ? post?.title : (articleVersion?.title || post?.title) || ""),
    content: translatedContent || (showOriginal ? post?.content : (articleVersion?.content || post?.content) || ""),
    ...post
  };

  const handleSelection = (index: number) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedText(selection.toString());
    }
  };

  const handleExplainMore = (index: number) => {
    if (selectedText) {
      console.log("Explain more about:", selectedText);
      setExplanationContent(`Explanation for: "${selectedText}"`);
      setShowExplanation(true);
      setSelectedParagraphIndex(index);
    }
  };

  const closeExplanation = () => {
    setShowExplanation(false);
    setExplanationContent("");
    setSelectedParagraphIndex(null);
  };

  useEffect(() => {
    setSelectedText("");
    setExplanationContent("");
    setShowExplanation(false);
    setSelectedParagraphIndex(null);
    
    // Reset translation when changing posts
    if (post) {
      setTranslatedTitle(post.title);
      setTranslatedContent(post.content);
    }
  }, [slug, post]);

  const handleSummaryClick = async () => {
    if (post && !isSummaryMode) {
      if (!getSummary(post.id.toString())) {
        setIsLoadingSummary(true);
        const summary = await fetchBlogSummary(post.id.toString());
        addSummary(post.id.toString(), summary);
        setIsLoadingSummary(false);
      }
      setIsSummaryMode(true);
    } else {
      setIsSummaryMode(false);
    }
  };

  const handleTranslation = (title: string, content: string) => {
    setTranslatedTitle(title);
    setTranslatedContent(content);
  };

  const getCurrentContent = () => {
    if (!post) return "";
    if (isSummaryMode) {
      return getSummary(post.id.toString()) || "";
    }
    return translatedContent || (showOriginal ? post.content : (articleVersion?.content || post.content));
  };

  if (!post) {
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

  const paragraphs = getCurrentContent().split("\n\n");

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
            <CategoryBadge category={post.category} />
            <Button
              variant="outline"
              onClick={handleSummaryClick}
              disabled={isLoadingSummary}
              className="flex items-center gap-2"
            >
              {isLoadingSummary && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoadingSummary ? 'Loading...' : (isSummaryMode ? 'Show Original' : 'Show Summary')}
            </Button>
            {post && (
              <TranslationDropdown
                blogId={post.id.toString()}
                originalTitle={showOriginal ? post.title : (articleVersion?.title || post.title)}
                originalContent={showOriginal ? post.content : (articleVersion?.content || post.content)}
                onTranslated={handleTranslation}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 prose dark:prose-invert prose-lg max-w-none">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {displayContent?.title || ''}
            </h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <span className="mr-3">{post?.date ? format(new Date(post.date), "MMMM d, yyyy") : ''}</span>
              <span className="mr-3">•</span>
              <span>5 min read</span> {/* Hardcoded since readingTime doesn't exist in Post type */}
            </div>
            
            {isLoading ? (
              <div className="space-y-4 mt-8">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-40 w-full rounded" />
                <Skeleton className="h-6 w-5/6 rounded" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-4/5 rounded" />
                <Skeleton className="h-40 w-full rounded" />
              </div>
            ) : (
              <>
                {paragraphs.map((paragraph, index) => (
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
                  About the author
                </h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 mr-3">
                    {/* Author avatar would go here */}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {post?.author?.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post?.author?.role || 'YC Partner'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                  metus vel nunc tempor sagittis.
                </p>
              </div>

              <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Content Complexity
                </h3>
                {post && <ComplexitySlider articleId={post.id.toString()} />}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
