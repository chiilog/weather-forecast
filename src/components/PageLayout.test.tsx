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

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-100', 'p-4');
  });
});
