
import { create } from 'zustand';

interface SummaryState {
  summaries: Record<string, string>;
  addSummary: (blogId: string, summary: string) => void;
  getSummary: (blogId: string) => string | null;
}

export const useBlogSummaryStore = create<SummaryState>((set, get) => ({
  summaries: {},
  addSummary: (blogId, summary) => {
    set((state) => ({
      summaries: { ...state.summaries, [blogId]: summary }
    }));
  },
  getSummary: (blogId) => {
    return get().summaries[blogId] || null;
  },
}));

// Mock API call
export const fetchBlogSummary = (blogId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This is a summary of blog ${blogId}. The key points discussed are: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`);
    }, 2000);
  });
};
