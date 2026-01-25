import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('子要素を表示する', () => {
    render(
      <PageLayout>
        <p>テストコンテンツ</p>
      </PageLayout>
    );

    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('適切なクラス名を持つ', () => {
    render(
      <PageLayout>
        <p>テストコンテンツ</p>
      </PageLayout>
    );

    // 内側のdiv: コンテンツの最大幅とセンタリング
    const contentDiv = screen.getByText('テストコンテンツ').parentElement;
    expect(contentDiv).toHaveClass('max-w-2xl', 'mx-auto');

    // 外側のdiv: 背景とパディング
    const layoutDiv = contentDiv?.parentElement;
    expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-100', 'p-4');
  });
});
