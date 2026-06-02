'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-neutral-800 bg-neutral-950/90 text-neutral-300">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-amber-200 font-semibold mb-4">About BlogHub</h3>
            <p className="text-sm">
              A professional blog post management system designed for content creators and publishers.
            </p>
          </div>
          <div>
            <h3 className="text-amber-200 font-semibold mb-4">Features</h3>
            <ul className="text-sm space-y-2">
              <li><span>Create & Edit Posts</span></li>
              <li><span>Search & Filter</span></li>
              <li><span>Export to CSV</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-200 font-semibold mb-4">Support</h3>
            <p className="text-sm">
              For support, please contact our team.
            </p>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8">
          <p className="text-center text-sm">
            © {currentYear} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
