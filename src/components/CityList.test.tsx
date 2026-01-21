import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CityList } from './CityList';
import { CITIES } from '../constants/cities';

describe('CityList', () => {
  it('全ての地域が表示される', () => {
    render(
      <BrowserRouter>
        <CityList />
      </BrowserRouter>
    );
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('兵庫')).toBeInTheDocument();
    expect(screen.getByText('大分')).toBeInTheDocument();
    expect(screen.getByText('北海道')).toBeInTheDocument();
  });

  it('各地域がリンクとして表示される', () => {
    render(
      <BrowserRouter>
        <CityList />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: '東京' })).toHaveAttribute(
      'href',
      '/weather/tokyo'
    );
    expect(screen.getByRole('link', { name: '兵庫' })).toHaveAttribute(
      'href',
      '/weather/hyogo'
    );
    expect(screen.getByRole('link', { name: '大分' })).toHaveAttribute(
      'href',
      '/weather/oita'
    );
    expect(screen.getByRole('link', { name: '北海道' })).toHaveAttribute(
      'href',
      '/weather/hokkaido'
    );
  });
});
