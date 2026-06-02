'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useNotification } from '@/hooks/useNotification';
import { blogService } from '@/services/blogService';
import type { CreateBlogPostPayload } from '@/types';
import { CATEGORIES } from '@/utils/constants';

type CreatePostFormData = Omit<CreateBlogPostPayload, 'tags'> & {
  tags?: string;
};

export default function CreatePostPage() {
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    defaultValues: {
      title: '',
      author: '',
      email: '',
      category: '',
      shortDescription: '',
      content: '',
      status: 'Draft',
      tags: '',
      thumbnailUrl: '',
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      setIsSubmitting(true);
      const processedData: CreateBlogPostPayload = {
        ...data,
        tags: data.tags
          ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
          : [],
      };
      await blogService.createPost(processedData);
      notifySuccess('Post created successfully');
      router.push('/');
    } catch (error: any) {
      notifyError(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <Layout>
        <LoadingSpinner message="Creating post..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Link href="/" className="link-accent mb-4 inline-block">
            ← Back to Posts
          </Link>
          <h1 className="page-title">Create New Blog Post</h1>
          <p className="page-subtitle mt-2">Fill in the details below to create a new blog post</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="panel p-8 space-y-6">
          {/* Title */}
          <FormInput
            label="Title *"
            placeholder="Enter post title"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 5, message: 'Title must be at least 5 characters' },
              maxLength: { value: 200, message: 'Title must not exceed 200 characters' }
            })}
            error={errors.title?.message}
          />

          {/* Author */}
          <FormInput
            label="Author *"
            placeholder="Your name"
            {...register('author', { required: 'Author name is required' })}
            error={errors.author?.message}
          />

          {/* Email */}
          <FormInput
            label="Email *"
            type="email"
            placeholder="your.email@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
            })}
            error={errors.email?.message}
          />

          {/* Category */}
          <FormSelect
            label="Category *"
            {...register('category', { required: 'Category is required' })}
            error={errors.category?.message}
            defaultValue=""
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </FormSelect>

          {/* Short Description */}
          <FormTextarea
            label="Short Description"
            placeholder="A brief overview of your post"
            {...register('shortDescription', {
              required: 'Short description is required',
              minLength: { value: 10, message: 'Short description must be at least 10 characters' },
              maxLength: { value: 500, message: 'Short description must not exceed 500 characters' }
            })}
            error={errors.shortDescription?.message}
            rows={3}
          />

          {/* Content */}
          <FormTextarea
            label="Content *"
            placeholder="Write your full blog post content here"
            {...register('content', {
              required: 'Content is required',
              minLength: { value: 50, message: 'Content must be at least 50 characters' }
            })}
            error={errors.content?.message}
            rows={10}
          />

          {/* Status */}
          <FormSelect
            label="Status"
            {...register('status')}
            error={errors.status?.message}
            defaultValue="Draft"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </FormSelect>

          {/* Tags */}
          <FormInput
            label="Tags"
            placeholder="Comma-separated tags (e.g., react, javascript, web)"
            {...register('tags')}
            error={errors.tags?.message}
          />

          {/* Thumbnail URL */}
          <FormInput
            label="Thumbnail URL"
            placeholder="https://example.com/image.jpg"
            {...register('thumbnailUrl')}
            error={errors.thumbnailUrl?.message}
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
            <Link href="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
