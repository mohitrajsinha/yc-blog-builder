
import { create } from 'zustand';
import { Post } from '../data/posts';

interface CategoriesState {
  selectedCategory: string | null;
  isLoading: boolean;
  setSelectedCategory: (category: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  selectedCategory: null,
  isLoading: false,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Mock API call
export const fetchPostsByCategory = (category: string): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPosts: Post[] = Array(6).fill(null).map((_, index) => ({
        id: index + 1, // Changed to number to match Post type
        title: `${category} Post ${index + 1}`,
        content: `Content for ${category} post ${index + 1}`,
        date: new Date().toISOString(),
        author: { 
          name: 'John Doe', 
          role: 'Author',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        category: category,
        slug: `${category}-post-${index + 1}`,
        excerpt: `This is an excerpt for ${category} post ${index + 1}`,
        coverImage: '/placeholder.svg',
      }));
      resolve(mockPosts);
    }, 2000);
  });
};
