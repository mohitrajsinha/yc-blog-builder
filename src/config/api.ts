export const API_BASE_URL = 'https://hulkbuster-news-agg.hf.space';

export const API_ENDPOINTS = {
  FEEDS: {
    EXTRACT_BLOG: `${API_BASE_URL}/feeds/extractblog`,
    SEARCH: `${API_BASE_URL}/feeds/search`,
    GROQ: `${API_BASE_URL}/feeds/groq`,
  },
} as const; 