import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CityListItem } from './CityListItem';
import type { City } from '../types/city';

describe('CityListItem', () => {
  const mockCity: City = {
    id: 'tokyo',
    name: '東京',
    nameEn: 'Tokyo',
  };

  it('地域名が表示される', () => {
    render(
      <BrowserRouter>
        <CityListItem city={mockCity} />
      </BrowserRouter>
    );
    expect(screen.getByText('東京')).toBeInTheDocument();
  });

  it('クリックで正しいURLに遷移する', () => {
    render(
      <BrowserRouter>
        <CityListItem city={mockCity} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: '東京' });
    expect(link).toHaveAttribute('href', '/weather/tokyo');
  });

  it('chevronアイコンが表示される', () => {
    render(
      <BrowserRouter>
        <CityListItem city={mockCity} />
      </BrowserRouter>
    );
    const chevron = screen.getByText('chevron_right');
    expect(chevron).toBeInTheDocument();
    expect(chevron).toHaveAttribute('aria-hidden', 'true');
  });
});
