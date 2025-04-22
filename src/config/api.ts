export const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  FEEDS: {
    EXTRACT_BLOG: `${API_BASE_URL}/feeds/extractblog`,
    SEARCH: `${API_BASE_URL}/feeds/search`,
    GROQ: `${API_BASE_URL}/feeds/groq`,
  },
} as const; 