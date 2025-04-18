
import { create } from 'zustand';

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

// Mock translation API call
export const fetchTranslation = (blogId: string, language: string, originalContent: string, originalTitle: string): Promise<Translation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock translations based on language
      let titlePrefix = '';
      let contentPrefix = '';
      
      if (language === 'hindi') {
        titlePrefix = 'हिंदी अनुवाद: ';
        contentPrefix = 'हिंदी अनुवाद: ';
      } else if (language === 'punjabi') {
        titlePrefix = 'ਪੰਜਾਬੀ ਅਨੁਵਾਦ: ';
        contentPrefix = 'ਪੰਜਾਬੀ ਅਨੁਵਾਦ: ';
      }
      
      resolve({
        content: `${contentPrefix}${originalContent}`,
        title: `${titlePrefix}${originalTitle}`
      });
    }, 2000); // 2 second mock delay
  });
};
