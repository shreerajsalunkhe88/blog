import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'BlogHub - Blog Post Management System',
  description: 'Professional blog post management system for creating, editing, and organizing your content.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#b68f4a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23b68f4a' rx='12'/><text x='50' y='70' font-size='60' font-weight='bold' fill='%23111113' text-anchor='middle' font-family='Georgia'>B</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
