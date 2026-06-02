'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useNotification } from '@/hooks/useNotification';
import { blogService } from '@/services/blogService';
import type { BlogPost } from '@/types';

export default function PostDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { notifySuccess, notifyError } = useNotification();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPostById(postId);
      setPost(data);
    } catch (error: any) {
      notifyError(error.message || 'Failed to load post');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(postId);
        notifySuccess('Post deleted successfully');
        router.push('/');
      } catch (error: any) {
        notifyError(error.message || 'Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Loading post..." />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-neutral-100">Post not found</h2>
          <p className="text-neutral-300 mt-2">The post you're looking for doesn't exist.</p>
          <Link href="/" className="link-accent mt-4 inline-block">
            Back to Posts
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <Link href="/" className="link-accent inline-block">
          ← Back to Posts
        </Link>

        {/* Post Container */}
        <article className="panel overflow-hidden">
          {/* Thumbnail */}
          {post.thumbnailUrl && (
            <div className="w-full h-96 overflow-hidden bg-neutral-900">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-400/40">
                {post.category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                post.status === 'Published' ? 'bg-green-100 text-green-800' :
                post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {post.status}
              </span>
              <span className="text-sm text-neutral-300">
                Views: {post.views || 0}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-neutral-100">{post.title}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 py-4 border-y border-neutral-800">
              <div>
                <p className="text-sm font-semibold text-amber-100">By {post.author}</p>
                <p className="text-sm text-neutral-300">{post.email}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-neutral-300">Published</p>
                <p className="text-sm font-semibold text-neutral-100">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Short Description */}
            {post.shortDescription && (
              <p className="text-lg text-neutral-200 italic">{post.shortDescription}</p>
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <p className="text-neutral-100 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <h3 className="font-semibold text-amber-100">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-8 border-t border-neutral-800 flex gap-4">
              <Link
                href={`/edit/${post._id}`}
                className="btn btn-primary"
              >
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Post
              </button>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
