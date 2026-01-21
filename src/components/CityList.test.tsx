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
    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('各地域がリンクとして表示される', () => {
    render(
      <BrowserRouter>
        <CityList />
      </BrowserRouter>
    );
    CITIES.forEach((city) => {
      expect(screen.getByRole('link', { name: city.name })).toHaveAttribute(
        'href',
        `/weather/${city.id}`
      );
    });
  });
});
