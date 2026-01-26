import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DateLabel } from './DateLabel';

describe('DateLabel', () => {
  it('日付ラベルが表示される', () => {
    render(<DateLabel dateTime="2024-01-25 12:00:00" />);

    expect(screen.getByText(/2024-01-25/)).toBeInTheDocument();
  });

  it('適切なスタイルが適用されている', () => {
    const { container } = render(<DateLabel dateTime="2024-01-25 12:00:00" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-gray-200');
    expect(wrapper).toHaveClass('px-4');
    expect(wrapper).toHaveClass('py-2');
  });
});
