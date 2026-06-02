import BlogPost from '../models/BlogPost.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { convertToCSV, generateFilename } from '../utils/csvHandler.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const createBlogPost = async (req, res, next) => {
  try {
    const { title, author, email, category, shortDescription, content, status, tags, thumbnailUrl } = req.body;

    const newPost = new BlogPost({
      title,
      author,
      email,
      category,
      shortDescription,
      content,
      status: status || 'Draft',
      tags: tags || [],
      thumbnailUrl: thumbnailUrl || '',
    });

    await newPost.save();
    return successResponse(res, newPost, 'Blog post created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getBlogPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const filters = {};

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.search) {
      filters.$text = { $search: req.query.search };
    }

    const totalPosts = await BlogPost.countDocuments(filters);
    const posts = await BlogPost.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalPosts / limit);

    return successResponse(
      res,
      {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalRecords: totalPosts,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      'Blog posts retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return errorResponse(res, 'Blog post not found', 404);
    }

    return successResponse(res, post, 'Blog post retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const post = await BlogPost.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return errorResponse(res, 'Blog post not found', 404);
    }

    return successResponse(res, post, 'Blog post updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return errorResponse(res, 'Blog post not found', 404);
    }

    return successResponse(res, {}, 'Blog post deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const searchBlogPosts = async (req, res, next) => {
  try {
    const { query, category, status } = req.query;
    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const filters = {};

    if (query) {
      filters.$text = { $search: query };
    }

    if (category) {
      filters.category = category;
    }

    if (status) {
      filters.status = status;
    }

    const totalPosts = await BlogPost.countDocuments(filters);
    const posts = await BlogPost.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalPosts / limit);

    return successResponse(
      res,
      {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalRecords: totalPosts,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      'Search results retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const exportBlogPostsToCSV = async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.search) {
      filters.$text = { $search: req.query.search };
    }

    const posts = await BlogPost.find(filters)
      .sort({ createdAt: -1 })
      .lean();

    if (posts.length === 0) {
      return errorResponse(res, 'No posts found to export', 404);
    }

    const csv = convertToCSV(posts);
    const filename = generateFilename('blog_posts');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = ['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health', 'Education'];
    return successResponse(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
};
