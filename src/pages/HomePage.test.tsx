import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('タイトルが表示される', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('天気予報アプリ')).toBeInTheDocument();
  });

  it('地域リストが表示される', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('兵庫')).toBeInTheDocument();
    expect(screen.getByText('大分')).toBeInTheDocument();
    expect(screen.getByText('北海道')).toBeInTheDocument();
  });
});
