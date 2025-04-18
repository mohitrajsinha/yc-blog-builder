
import React, { useState } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslationStore, fetchTranslation } from "@/hooks/useTranslationStore";

interface TranslationDropdownProps {
  blogId: string;
  originalTitle: string;
  originalContent: string;
  onTranslated: (title: string, content: string) => void;
}

const TranslationDropdown: React.FC<TranslationDropdownProps> = ({
  blogId,
  originalTitle,
  originalContent,
  onTranslated
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
  const { addTranslation, getTranslation, setLoadingLanguage, isLoadingLanguage } = useTranslationStore();

  const handleLanguageChange = async (language: string) => {
    if (language === "english") {
      // For English, simply use the original content (no API call needed)
      onTranslated(originalTitle, originalContent);
      setSelectedLanguage(language);
      return;
    }

    setSelectedLanguage(language);
    
    // Check if we already have a translation for this language and blog
    const existingTranslation = getTranslation(blogId, language);
    if (existingTranslation) {
      onTranslated(existingTranslation.title, existingTranslation.content);
      return;
    }

    // If not, fetch translation and show loading state
    setLoadingLanguage(language, true);
    
    try {
      const translation = await fetchTranslation(blogId, language, originalContent, originalTitle);
      addTranslation(blogId, language, translation);
      onTranslated(translation.title, translation.content);
    } catch (error) {
      console.error("Error fetching translation:", error);
    } finally {
      setLoadingLanguage(language, false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
          {isLoadingLanguage(selectedLanguage) && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleLanguageChange("english")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("hindi")}>
          Hindi {isLoadingLanguage("hindi") && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("punjabi")}>
          Punjabi {isLoadingLanguage("punjabi") && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TranslationDropdown;
