export interface IContent {
  id: string;
  title: string;
  genre: string;
  thumbnailImage?: string;
  video?: string;
  director: string;
  releaseYear: number;
  cast: string;
  streamingPlatform: string;
  description: string;
  like: number;
  price: number;
  rating: number;
  dislike: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface SearchParams {
  searchTerm?: string;
  [key: string]: any; // For dynamic field filters
}

export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
