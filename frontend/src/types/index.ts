export interface BlogPost {
  _id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  shortDescription: string;
  content: string;
  thumbnailUrl: string;
  tags: string[];
  status: 'Draft' | 'Published';
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostPayload {
  title: string;
  author: string;
  email: string;
  category: string;
  shortDescription: string;
  content: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: 'Draft' | 'Published';
}

export interface UpdateBlogPostPayload {
  title?: string;
  author?: string;
  email?: string;
  category?: string;
  shortDescription?: string;
  content?: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: 'Draft' | 'Published';
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogPostListResponse {
  posts: BlogPost[];
  pagination: PaginationData;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
