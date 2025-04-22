import { create } from 'zustand';
import { API_ENDPOINTS } from '../config/api';

interface Translation {
  content: string;
  title: string;
}

interface TranslationState {
  translations: Record<string, Record<string, Translation>>;  // blogId -> language -> translation
  loadingLanguages: Record<string, boolean>;  // language -> loading state
  addTranslation: (blogId: string, language: string, translation: Translation) => void;
  getTranslation: (blogId: string, language: string) => Translation | null;
  setLoadingLanguage: (language: string, isLoading: boolean) => void;
  isLoadingLanguage: (language: string) => boolean;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  translations: {},
  loadingLanguages: {},
  addTranslation: (blogId, language, translation) => 
    set((state) => ({
      translations: {
        ...state.translations,
        [blogId]: {
          ...(state.translations[blogId] || {}),
          [language]: translation
        }
      }
    })),
  getTranslation: (blogId, language) => 
    get().translations[blogId]?.[language] || null,
  setLoadingLanguage: (language, isLoading) =>
    set((state) => ({
      loadingLanguages: {
        ...state.loadingLanguages,
        [language]: isLoading
      }
    })),
  isLoadingLanguage: (language) => 
    get().loadingLanguages[language] || false,
}));

// Translation API call
export const fetchTranslation = async (blogId: string, language: string, originalContent: string, originalTitle: string): Promise<Translation> => {
  try {
    // Map language names to language codes
    const languageCodeMap: Record<string, string> = {
      'hindi': 'hi',
      'punjabi': 'pa'
    };

    const targetLanguage = languageCodeMap[language] || 'en';

    // First translate the title
    const titleResponse = await fetch(API_ENDPOINTS.FEEDS.GROQ, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: originalTitle,
        operation: "translate",
        target_language: targetLanguage,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 1,
        top_k: 50
      })
    });

    const titleData = await titleResponse.json();
    const translatedTitle = titleData.translation;

    // Then translate the content
    const contentResponse = await fetch(API_ENDPOINTS.FEEDS.GROQ, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: originalContent,
        operation: "translate",
        target_language: targetLanguage,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 1,
        top_k: 50
      })
    });

    const contentData = await contentResponse.json();
    const translatedContent = contentData.translation;

    return {
      title: translatedTitle,
      content: translatedContent
    };
  } catch (error) {
    console.error('Error fetching translation:', error);
    throw error;
  }
};
