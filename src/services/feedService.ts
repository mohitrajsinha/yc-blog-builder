import { API_ENDPOINTS } from '../config/api';

export interface MediaItem {
  type: string;
  url: string;
  width: string;
  height: string;
  medium: string;
  description: string | null;
  length: string | null;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  description: string;
  pub_date: string;
  media: MediaItem[];
  content_encoded: string | null;
}

export interface BlogContent {
  url: string;
  content: string;
}

export interface SearchResult {
  feed: {
    id: string;
    name: string;
    category: string;
  };
  item: {
    id: string;
    title: string;
    link: string;
    pub_date: string;
    description: string;
  };
  media: {
    images: string[];
    all_media: Array<{
      id: number;
      item_id: string;
      type: string;
      url: string;
      width: string;
      height: string;
      medium: string;
      description: string | null;
      length: number | null;
    }>;
  };
  relevance_score: number;
  matched_content: string;
}

export interface SearchResponse {
  status: string;
  query: string;
  results: SearchResult[];
}

export const fetchBlogContent = async (url: string): Promise<BlogContent> => {
  const response = await fetch(API_ENDPOINTS.FEEDS.EXTRACT_BLOG, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blog content');
  }

  return response.json();
};

export const searchFeeds = async (query: string, k: number = 5): Promise<SearchResponse> => {
  const response = await fetch(API_ENDPOINTS.FEEDS.SEARCH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, k }),
  });

  if (!response.ok) {
    throw new Error('Failed to search feeds');
  }

  return response.json();
};
