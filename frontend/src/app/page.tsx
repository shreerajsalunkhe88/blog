'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import { FormInput } from '@/components/common/FormInput';
import { FormSelect } from '@/components/common/FormSelect';
import { useNotification } from '@/hooks/useNotification';
import { blogService } from '@/services/blogService';
import type { BlogPost } from '@/types';
import { CATEGORIES } from '@/utils/constants';

export default function BlogListPage() {
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotification();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadPosts();
  }, [currentPage, selectedCategory, selectedStatus]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllPosts(
        currentPage,
        10,
        selectedStatus || undefined,
        selectedCategory || undefined,
        searchTerm || undefined
      );
      setPosts(response.posts);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      notifyError(error.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    loadPosts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(id);
        notifySuccess('Post deleted successfully');
        loadPosts();
      } catch (error: any) {
        notifyError(error.message || 'Failed to delete post');
      }
    }
  };

  const handleExport = async () => {
    try {
      await blogService.exportPostsToCSV();
      notifySuccess('Posts exported successfully');
    } catch (error: any) {
      notifyError(error.message || 'Failed to export posts');
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  if (loading && posts.length === 0) {
    return (
      <Layout>
        <LoadingSpinner message="Loading blog posts..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="page-title">Blog Management</h1>
            <p className="page-subtitle mt-2">Manage, create, and organize your blog posts</p>
          </div>
          <Link
            href="/create"
            className="btn btn-primary w-full md:w-auto text-center"
          >
            + Create New Post
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="panel p-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-100">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Search by title, author, or content"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormSelect
              label="Category"
              options={[
                { value: '', label: 'All Categories' },
                ...CATEGORIES.map(cat => ({ value: cat, label: cat }))
              ]}
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            />
            <FormSelect
              label="Status"
              options={[
                { value: '', label: 'All Status' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Published', label: 'Published' },
                { value: 'Archived', label: 'Archived' }
              ]}
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Search
            </button>
            <button
              onClick={handleExport}
              className="btn btn-secondary"
            >
              Export to CSV
            </button>
          </div>
        </div>

        {/* Posts List Section */}
        <div className="panel overflow-hidden">
          {posts.length === 0 ? (
            <EmptyState
              title="No blog posts found"
              description="Start by creating your first blog post"
              action={{
                label: 'Create Post',
                onClick: () => router.push('/create'),
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-900/60 border-b border-neutral-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-100">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-100">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-100">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-100">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-100">Views</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-amber-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-amber-500/10 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-neutral-100 truncate max-w-xs">{post.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-300">{post.author}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-400/40">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === 'Published' ? 'bg-green-100 text-green-800' :
                          post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-300">{post.views || 0}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/posts/${post._id}`}
                            className="btn btn-secondary text-xs py-1 px-3"
                          >
                            View
                          </Link>
                          <Link
                            href={`/edit/${post._id}`}
                            className="btn btn-primary text-xs py-1 px-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="btn btn-danger text-xs py-1 px-3"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Layout>
  );
}
