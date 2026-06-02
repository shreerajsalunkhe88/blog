export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const CATEGORIES = ['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health', 'Education'];

export const STATUS_OPTIONS = ['Draft', 'Published'];

export const TOAST_DURATION = 3000;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};
