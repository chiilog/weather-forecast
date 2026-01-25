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
    const { container } = render(
      <PageLayout>
        <p>テストコンテンツ</p>
      </PageLayout>
    );

    // 外側のdiv: 背景とパディング
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-100', 'p-4');

    // 内側のdiv: コンテンツの最大幅とセンタリング
    const contentDiv = layoutDiv.firstChild as HTMLElement;
    expect(contentDiv).toHaveClass('max-w-2xl', 'mx-auto');
  });
});
