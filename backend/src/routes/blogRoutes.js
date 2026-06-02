import express from 'express';
import {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  searchBlogPosts,
  exportBlogPostsToCSV,
  getCategories,
} from '../controllers/blogController.js';
import {
  validateCreateBlogPost,
  validateUpdateBlogPost,
  validateGetById,
  validateListPosts,
  validateDeletePost,
} from '../validators/postValidator.js';

const router = express.Router();

router.post('/', validateCreateBlogPost, createBlogPost);
router.get('/list/all', validateListPosts, getBlogPosts);
router.get('/search/posts', searchBlogPosts);
router.get('/export/csv', exportBlogPostsToCSV);
router.get('/categories/all', getCategories);
router.get('/:id', validateGetById, getBlogPostById);
router.put('/:id', validateUpdateBlogPost, updateBlogPost);
router.delete('/:id', validateDeletePost, deleteBlogPost);

export default router;
