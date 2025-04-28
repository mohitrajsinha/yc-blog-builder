
import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Skeleton } from "./ui/skeleton";
import { Checkbox } from "./ui/checkbox";
import { useComplexityStore } from "../hooks/useComplexityStore";
import { toast } from "sonner";

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
    setIsLoading 
  } = useComplexityStore();
  
  const [localComplexity, setLocalComplexity] = useState<number>(complexityLevel);

  const handleComplexityChange = async (value: number[]) => {
    const newLevel = value[0];
    setLocalComplexity(newLevel);
    
    // If show original is enabled, disable it
    if (showOriginal) {
      setShowOriginal(false);
    }
    
    // If we don't have this version cached yet, fetch it
    if (!articleVersions[articleId]?.[newLevel]) {
      setIsLoading(true);
      
      // Simulate API fetch with different complexity levels
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const version = generateMockVersion(newLevel);
        setArticleVersion(articleId, newLevel, version);
      } catch (error) {
        toast.error("Failed to load content version");
      } finally {
        setIsLoading(false);
      }
    }
    
    setComplexityLevel(newLevel);
  };
  
  const handleShowOriginalChange = (checked: boolean) => {
    setShowOriginal(checked);
  };
  
  const generateMockVersion = (level: number) => {
    const versions = {
      1: {
        title: "Basic Version: Trade Relations Between China and US",
        content: "China and US are having trade problems. China has five ways to respond. These include selling US bonds, stopping rare earth exports, and limiting US company access to China markets. This could hurt both countries' economies."
      },
      2: {
        title: "Simple Analysis: Five Cards China Holds in US Trade War",
        content: "China has several options in the ongoing trade dispute with the United States. They could sell US Treasury bonds, restrict rare earth exports, or limit market access for US companies. Each option has different economic impacts on both nations."
      },
      3: {
        title: "Detailed Overview: China's Strategic Options in US Trade War",
        content: "In the escalating trade tensions, China possesses multiple strategic responses to US measures. These include leveraging their substantial US Treasury holdings, controlling rare earth mineral exports, and regulating market access for American corporations. Each strategy carries specific economic implications for both countries."
      },
      4: {
        title: "Comprehensive Analysis: China's Economic Leverage in US Trade Dispute",
        content: "China maintains several significant economic leverage points in the ongoing trade dispute with the United States. Their strategic options include manipulating their substantial US Treasury holdings, implementing restrictions on rare earth mineral exports, and modifying market access parameters for American corporations. Each approach presents distinct macroeconomic implications."
      },
      5: {
        title: "Expert-Level Analysis: Strategic Economic Warfare Options Between China and US",
        content: "In the context of escalating trade tensions, China possesses multiple sophisticated economic warfare options. These include strategic manipulation of their substantial US Treasury holdings, implementation of targeted rare earth mineral export restrictions, and selective modification of market access parameters for American corporations. Each strategic option carries complex macroeconomic implications and potential retaliatory risks."
      }
    };
    
    return versions[level as keyof typeof versions];
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-2">
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
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Complexity</h3>
        
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>Basic</span>
          <span>Expert</span>
        </div>
        
        <Slider
          value={[localComplexity]}
          onValueChange={handleComplexityChange}
          max={5}
          min={1}
          step={1}
          className="mb-6"
        />
        
        <div className="flex justify-between text-xs text-gray-400 px-1">
          <span>L1</span>
          <span>L2</span>
          <span>L3</span>
          <span>L4</span>
          <span>L5</span>
        </div>
      </div>
    </div>
  );
};

export default ComplexitySlider;

