import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSkeleton } from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('ローディングステータスとして表示される', () => {
    render(<LoadingSkeleton />);
    const skeleton = screen.getByRole('status', { name: '読み込み中' });

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('デフォルトで5つのアイテムが表示される', () => {
    const { container } = render(<LoadingSkeleton />);
    const items = container.querySelectorAll('.bg-white.border-b');
    expect(items).toHaveLength(5);
  });

  it('countプロパティで表示数を変更できる', () => {
    const { container } = render(<LoadingSkeleton count={3} />);
    const items = container.querySelectorAll('.bg-white.border-b');
    expect(items).toHaveLength(3);
  });

  it('日付ラベルが適切な位置に表示される', () => {
    const { container } = render(<LoadingSkeleton />);
    const dateLabels = container.querySelectorAll('.bg-gray-200.px-4.py-2');
    expect(dateLabels).toHaveLength(2);
  });
});
