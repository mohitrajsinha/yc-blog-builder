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

export interface BlogContent {
  url: string;
  content: string;
}

export const fetchFeeds = async (): Promise<Feed[]> => {
  const response = await fetch('http://localhost:8000/feeds/');
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  return response.json();
};

export const fetchBlogContent = async (url: string): Promise<BlogContent> => {
  const response = await fetch('http://localhost:8000/feeds/extractblog', {
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
