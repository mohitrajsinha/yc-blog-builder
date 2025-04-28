import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InterestsState {
  blogDescriptions: Set<string>;
  addBlogDescription: (description: string) => void;
  removeBlogDescription: (description: string) => void;
  similarBlogs: any[];
  setSimilarBlogs: (blogs: any[]) => void;
  setBlogDescriptions: (descriptions: string[]) => void;
}

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'interests-storage',
    }
  )
);
