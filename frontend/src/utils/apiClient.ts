import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from './constants';
import type { ApiResponse } from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data: any, config = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data: any, config = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string, config = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response?.data) {
      const { message, errors } = error.response.data;
      if (Array.isArray(errors) && errors.length > 0) {
        const firstError = errors[0];
        if (typeof firstError === 'string') {
          return new Error(firstError);
        }
        if (typeof firstError?.message === 'string') {
          return new Error(firstError.message);
        }
      }
      return new Error(message || 'An error occurred');
    }
    if (error.message === 'Network Error') {
      return new Error('Network error. Please check your connection.');
    }
    return error;
  }
}

export const apiClient = new ApiClient();
