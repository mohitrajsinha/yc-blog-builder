import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchFeeds } from '@/services/feedService';

interface Interest {
  id: string;
  name: string;
}

interface InterestsState {
  blogDescriptions: Set<string>;
  addBlogDescription: (description: string) => void;
  removeBlogDescription: (description: string) => void;
  similarBlogs: any[];
  setSimilarBlogs: (blogs: any[]) => void;
  setBlogDescriptions: (descriptions: string[]) => void;
  
  interests: Interest[];
  selectedInterests: Interest[];
  addInterest: (interest: Interest) => void;
  removeInterest: (id: string) => void;
  hasSelectedInterests: boolean;
  setHasSelectedInterests: (value: boolean) => void;
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
  fetchSearchResults: () => Promise<void>;
}

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set, get) => ({
      blogDescriptions: new Set<string>(),
      addBlogDescription: (description: string) => set((state) => {
        const newDescriptions = new Set(state.blogDescriptions);
        newDescriptions.add(description);
        return { blogDescriptions: newDescriptions };
      }),
      removeBlogDescription: (description: string) => set((state) => {
        const newDescriptions = new Set(state.blogDescriptions);
        newDescriptions.delete(description);
        return { blogDescriptions: newDescriptions };
      }),
      similarBlogs: [],
      setSimilarBlogs: (blogs) => set((state) => {
        const validBlogs = Array.isArray(blogs) ? blogs : [];
        return { similarBlogs: validBlogs };
      }),
      setBlogDescriptions: (descriptions) => set((state) => {
        const validDescriptions = Array.isArray(descriptions) ? new Set(descriptions) : new Set<string>();
        return { blogDescriptions: validDescriptions };
      }),
      
      interests: [
        { id: 'technology', name: 'Technology' },
        { id: 'business', name: 'Business' },
        { id: 'science', name: 'Science' },
        { id: 'politics', name: 'Politics' },
        { id: 'health', name: 'Health' },
        { id: 'sports', name: 'Sports' },
        { id: 'entertainment', name: 'Entertainment' },
        { id: 'education', name: 'Education' },
        { id: 'world', name: 'World News' }
      ],
      selectedInterests: [],
      addInterest: (interest) => set((state) => {
        if (state.selectedInterests.find(i => i.id === interest.id)) {
          return state;
        }
        return { selectedInterests: [...state.selectedInterests, interest] };
      }),
      removeInterest: (id) => set((state) => ({
        selectedInterests: state.selectedInterests.filter(interest => interest.id !== id)
      })),
      hasSelectedInterests: false,
      setHasSelectedInterests: (value) => set({ hasSelectedInterests: value }),
      searchResults: [],
      isLoading: false,
      error: null,
      fetchSearchResults: async () => {
        const state = get();
        const query = state.selectedInterests.map(interest => interest.name).join(', ');
        
        if (!query) {
          return;
        }
        
        set({ isLoading: true, error: null });
        
        try {
          const response = await searchFeeds(query);
          if (response && response.results) {
            set({ searchResults: response.results || [], isLoading: false });
          } else {
            const mockResults = [
              {
                feed: { id: "1", name: "Tech News", category: "Technology" },
                item: {
                  id: "article1",
                  title: "The Future of AI",
                  link: "https://example.com/ai-future",
                  pub_date: "2025-04-01",
                  description: "An exploration of how AI will shape our future."
                },
                media: {
                  images: ["https://placehold.co/600x400/png"],
                  all_media: [{ url: "https://placehold.co/600x400/png", id: 1, item_id: "1", type: "image", width: "600", height: "400", medium: "image", description: null, length: null }]
                },
                relevance_score: 0.95,
                matched_content: "AI future technology"
              },
              {
                feed: { id: "2", name: "Business Insider", category: "Business" },
                item: {
                  id: "article2",
                  title: "Market Trends 2025",
                  link: "https://example.com/market-trends",
                  pub_date: "2025-04-02",
                  description: "Analysis of emerging market trends for the coming year."
                },
                media: {
                  images: ["https://placehold.co/600x400/png"],
                  all_media: [{ url: "https://placehold.co/600x400/png", id: 2, item_id: "2", type: "image", width: "600", height: "400", medium: "image", description: null, length: null }]
                },
                relevance_score: 0.87,
                matched_content: "market trends analysis"
              }
            ];
            set({ searchResults: mockResults, isLoading: false });
          }
        } catch (err) {
          console.error("Error fetching search results:", err);
          set({ error: "Failed to fetch articles", isLoading: false });
        }
      }
    }),
    {
      name: 'interests-storage',
    }
  )
);
