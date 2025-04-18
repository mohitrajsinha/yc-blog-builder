
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

export interface Feed {
  id: string;
  name: string;
  url: string;
  category: string;
  last_updated: string;
  items: FeedItem[];
}

export const fetchFeeds = async (): Promise<Feed[]> => {
  const response = await fetch('http://localhost:8000/feeds/');
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  return response.json();
};
