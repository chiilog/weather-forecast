import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * ページ全体のレイアウトコンポーネント
 */
export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="min-h-screen bg-gray-100 p-4">{children}</div>
);
