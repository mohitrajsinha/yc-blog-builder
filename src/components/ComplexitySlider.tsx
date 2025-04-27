
import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Skeleton } from "./ui/skeleton";
import { Checkbox } from "./ui/checkbox";
import { useComplexityStore } from "../hooks/useComplexityStore";

interface ComplexitySliderProps {
  articleId: string;
}

const ComplexitySlider = ({ articleId }: ComplexitySliderProps) => {
  const { 
    complexityLevel, 
    setComplexityLevel, 
    showOriginal,
    setShowOriginal,
    articleVersions, 
    setArticleVersion, 
    isLoading, 
    setIsLoading 
  } = useComplexityStore();
  
  const [localComplexity, setLocalComplexity] = useState<number>(complexityLevel);

  const handleComplexityChange = (value: number[]) => {
    const newLevel = value[0];
    setLocalComplexity(newLevel);
    
    // If show original is enabled, disable it
    if (showOriginal) {
      setShowOriginal(false);
    }
    
    // If we don't have this version cached yet, show loading state
    if (!articleVersions[articleId]?.[newLevel]) {
      setIsLoading(true);
      
      // Simulate API fetch - in real app, this would be an actual API call
      setTimeout(() => {
        fetchArticleVersion(articleId, newLevel);
      }, 1500);
    } else {
      // We already have this version, just update immediately
      setComplexityLevel(newLevel);
    }
  };
  
  const handleShowOriginalChange = (checked: boolean) => {
    setShowOriginal(checked);
  };
  
  const fetchArticleVersion = (articleId: string, level: number) => {
    // Simulate fetching from API
    const mockContent = generateMockContent(level);
    setArticleVersion(articleId, level, mockContent);
    setComplexityLevel(level);
    setIsLoading(false);
  };
  
  const generateMockContent = (level: number) => {
    const complexityTexts = {
      0: "Level 1 (Basic): Simple version with basic vocabulary and shorter sentences, designed for beginners or those who prefer straightforward explanations.",
      1: "Level 2 (Elementary): Slightly more detailed version with some basic terminology introduced and explained in a clear manner.",
      2: "Level 3 (Intermediate): Moderate complexity with balanced vocabulary and sentence structure, suitable for general audiences.",
      3: "Level 4 (Advanced): Detailed version with technical vocabulary and in-depth analysis for readers with domain knowledge.",
      4: "Level 5 (Expert): Highly technical version with specialized terminology, complex concepts, and nuanced discussions for expert readers."
    };
    
    // Return mock content based on complexity level
    return {
      title: `Article at complexity level ${level + 1}`,
      content: complexityTexts[level as keyof typeof complexityTexts] + 
               "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna ultricies aliquet. " +
               "Proin fermentum, magna vel tincidunt feugiat, nunc libero ultrices orci, quis facilisis purus lectus non ipsum."
    };
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox 
          id="showOriginal" 
          checked={showOriginal} 
          onCheckedChange={handleShowOriginalChange}
        />
        <label
          htmlFor="showOriginal"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Original
        </label>
      </div>
      
      <h3 className="text-lg font-semibold mb-3">Content Complexity</h3>
      
      <div className="mb-2 flex justify-between text-sm text-gray-500">
        <span>Basic</span>
        <span>Intermediate</span>
        <span>Expert</span>
      </div>
      
      <Slider
        defaultValue={[localComplexity]}
        max={4}
        step={1}
        value={[localComplexity]}
        onValueChange={(value) => setLocalComplexity(value[0])}
        onValueCommit={handleComplexityChange}
        className="mb-6"
        disabled={showOriginal}
      />
      
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>L1</span>
        <span>L2</span>
        <span>L3</span>
        <span>L4</span>
        <span>L5</span>
      </div>
      
      {isLoading && (
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      )}
    </div>
  );
};

export default ComplexitySlider;
