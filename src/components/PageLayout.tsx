import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * ページ全体のレイアウトコンポーネント
 */
export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-2xl mx-auto">{children}</div>
  </div>
);
