
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ArticleVersion {
  title: string;
  content: string;
}

interface ArticleVersions {
  [articleId: string]: {
    [complexityLevel: number]: ArticleVersion;
  };
}

interface ComplexityState {
  complexityLevel: number;
  setComplexityLevel: (level: number) => void;
  showOriginal: boolean;
  setShowOriginal: (show: boolean) => void;
  articleVersions: ArticleVersions;
  setArticleVersion: (articleId: string, level: number, version: ArticleVersion) => void;
  getArticleVersion: (articleId: string) => ArticleVersion | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useComplexityStore = create<ComplexityState>()(
  persist(
    (set, get) => ({
      complexityLevel: 1,
      setComplexityLevel: (level: number) => set({ complexityLevel: level }),
      
      showOriginal: true,
      setShowOriginal: (show: boolean) => set({ showOriginal: show }),
      
      articleVersions: {},
      setArticleVersion: (articleId: string, level: number, version: ArticleVersion) => 
        set((state) => ({
          articleVersions: {
            ...state.articleVersions,
            [articleId]: {
              ...(state.articleVersions[articleId] || {}),
              [level]: version
            }
          }
        })),
      
      getArticleVersion: (articleId: string) => {
        const state = get();
        if (state.showOriginal) {
          return null;
        }
        const versions = state.articleVersions[articleId];
        return versions && versions[state.complexityLevel] || null;
      },
      
      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'complexity-storage',
    }
  )
);

