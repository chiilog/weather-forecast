import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('タイトルが表示される', () => {
    render(<HomePage />);
    expect(screen.getByText('天気予報アプリ')).toBeInTheDocument();
  });
});
