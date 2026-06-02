import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      minlength: [5, 'Title must be at least 5 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
      minlength: [2, 'Author name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health', 'Education'],
    },
    tags: {
      type: [String],
      default: [],
      maxlength: [10, 'Cannot have more than 10 tags'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [500, 'Short description cannot exceed 500 characters'],
      minlength: [10, 'Short description must be at least 10 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      minlength: [50, 'Content must be at least 50 characters'],
    },
    thumbnailUrl: {
      type: String,
      default: '',
      match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please provide a valid URL'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
blogPostSchema.index({ title: 'text', author: 'text', category: 'text' });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ status: 1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
