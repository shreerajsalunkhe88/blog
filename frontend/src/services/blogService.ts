import { apiClient } from '@/utils/apiClient';
import type { BlogPost, CreateBlogPostPayload, UpdateBlogPostPayload, BlogPostListResponse, ApiResponse } from '@/types';

export const blogService = {
  async getAllPosts(page = 1, limit = 10, status?: string, category?: string, search?: string): Promise<BlogPostListResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const response = await apiClient.get<BlogPostListResponse>(`/posts/list/all?${params}`);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  async getPostById(id: string): Promise<BlogPost> {
    const response = await apiClient.get<BlogPost>(`/posts/${id}`);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  async createPost(payload: CreateBlogPostPayload): Promise<BlogPost> {
    const response = await apiClient.post<BlogPost>('/posts', payload);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  async updatePost(id: string, payload: UpdateBlogPostPayload): Promise<BlogPost> {
    const response = await apiClient.put<BlogPost>(`/posts/${id}`, payload);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    const response = await apiClient.delete(`/posts/${id}`);
    if (!response.success) throw new Error(response.message);
  },

  async searchPosts(query: string, page = 1, limit = 10, category?: string, status?: string): Promise<BlogPostListResponse> {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (category) params.append('category', category);
    if (status) params.append('status', status);

    const response = await apiClient.get<BlogPostListResponse>(`/posts/search/posts?${params}`);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  async exportPostsToCSV(status?: string, category?: string, search?: string): Promise<string> {
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/export/csv?${params}`);
      if (!response.ok) throw new Error('Failed to export CSV');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `blog_posts_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return 'CSV exported successfully';
    } catch (error) {
      throw new Error('Failed to export CSV');
    }
  },

  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<string[]>('/posts/categories/all');
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};
