import { body, validationResult, param, query } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
  next();
};

export const validateCreateBlogPost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health', 'Education'])
    .withMessage('Invalid category'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Short description must be between 10 and 500 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('status')
    .optional()
    .isIn(['Draft', 'Published'])
    .withMessage('Invalid status'),
  body('tags')
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) {
        if (value.length > 10) {
          throw new Error('Cannot have more than 10 tags');
        }
        return true;
      }
      return true;
    }),
  body('thumbnailUrl')
    .optional()
    .trim()
    .custom((value) => {
      if (value === '') return true;
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  handleValidationErrors,
];

export const validateUpdateBlogPost = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('category')
    .optional()
    .isIn(['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health', 'Education'])
    .withMessage('Invalid category'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Short description must be between 10 and 500 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('status')
    .optional()
    .isIn(['Draft', 'Published'])
    .withMessage('Invalid status'),
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Cannot have more than 10 tags'),
  body('thumbnailUrl')
    .optional()
    .trim()
    .custom((value) => {
      if (value === '') return true;
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  handleValidationErrors,
];

export const validateGetById = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
];

export const validateListPosts = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['Draft', 'Published'])
    .withMessage('Invalid status'),
  query('category')
    .optional()
    .trim(),
  query('search')
    .optional()
    .trim(),
];

export const validateDeletePost = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
];
