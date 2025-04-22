import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchFeeds, SearchResult } from '@/services/feedService';

export type Interest = {
  id: string;
  name: string;
  icon?: string;
};

interface InterestsState {
  selectedInterests: Interest[];
  hasSelectedInterests: boolean;
  interests: Interest[];
  searchResults: SearchResult[];
  blogDescriptions: Set<string>;
  isLoading: boolean;
  error: string | null;
  addInterest: (interest: Interest) => void;
  removeInterest: (interestId: string) => void;
  setHasSelectedInterests: (value: boolean) => void;
  fetchSearchResults: () => Promise<void>;
  clearSearchResults: () => void;
  addBlogDescription: (description: string) => void;
}

const DEFAULT_INTERESTS = [
  { id: '1', name: 'Startups' },
  { id: '2', name: 'Technology' },
  { id: '3', name: 'Fundraising' },
  { id: '4', name: 'Growth' },
  { id: '5', name: 'Product' },
  { id: '6', name: 'AI' },
  { id: '7', name: 'Marketing' },
  { id: '8', name: 'Design' },
  { id: '9', name: 'Engineering' },
];

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set, get) => ({
      selectedInterests: [],
      hasSelectedInterests: false,
      interests: DEFAULT_INTERESTS,
      searchResults: [],
      blogDescriptions: new Set<string>(),
      isLoading: false,
      error: null,
      addInterest: (interest) =>
        set((state) => ({
          selectedInterests: [...state.selectedInterests, interest],
        })),
      removeInterest: (interestId) =>
        set((state) => ({
          selectedInterests: state.selectedInterests.filter(
            (interest) => interest.id !== interestId
          ),
        })),
      setHasSelectedInterests: (value) =>
        set(() => ({
          hasSelectedInterests: value,
        })),
      fetchSearchResults: async () => {
        const { selectedInterests, blogDescriptions } = get();
        // Only fetch if there are selected interests or blog descriptions
        if (selectedInterests.length === 0 && blogDescriptions.size === 0) {
          set({ searchResults: [], isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const results = new Set<SearchResult>();
          
          // Fetch results for each selected interest
          await Promise.all(
            selectedInterests.map(async (interest) => {
              const response = await searchFeeds(interest.name);
              response.results.forEach(result => results.add(result));
            })
          );

          // Fetch results for each blog description
          await Promise.all(
            Array.from(blogDescriptions).map(async (description) => {
              const response = await searchFeeds(description);
              response.results.forEach(result => results.add(result));
            })
          );

          set({ 
            searchResults: Array.from(results),
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: 'Failed to fetch search results',
            isLoading: false 
          });
        }
      },
      clearSearchResults: () => set({ searchResults: [] }),
      addBlogDescription: (description: string) => 
        set((state) => {
          const newDescriptions = new Set(state.blogDescriptions);
          newDescriptions.add(description);
          return { blogDescriptions: newDescriptions };
        }),
    }),
    {
      name: 'interests-storage',
      partialize: (state) => ({
        selectedInterests: state.selectedInterests,
        hasSelectedInterests: state.hasSelectedInterests,
        blogDescriptions: Array.from(state.blogDescriptions),
      }),
      merge: (persistedState, currentState) => {
        if (persistedState && 'blogDescriptions' in persistedState) {
          return {
            ...currentState,
            ...persistedState,
            blogDescriptions: new Set(persistedState.blogDescriptions),
          };
        }
        return currentState;
      },
    }
  )
);
