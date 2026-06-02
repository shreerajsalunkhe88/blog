'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-300 to-amber-600">
              <span className="text-neutral-900 font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-amber-100">BlogHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-amber-300 font-semibold' : 'text-neutral-300 hover:text-amber-100'
              }`}
            >
              Posts
            </Link>
            <Link
              href="/create"
              className={`font-medium transition-colors ${
                isActive('/create') ? 'text-amber-300 font-semibold' : 'text-neutral-300 hover:text-amber-100'
              }`}
            >
              Create
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/create')}
              className="btn btn-primary hidden sm:inline-flex"
            >
              Create Post
            </button>
            <button
              onClick={() => router.push('/create')}
              className="btn btn-primary sm:hidden px-3 py-2 text-sm"
            >
              New
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
