import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WeatherList } from './WeatherList';

describe('WeatherList', () => {
  const mockItems = [
    {
      dateTime: 1609459200,
      iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
      temperature: 15.5,
      description: '晴れ',
    },
    {
      dateTime: 1609470000,
      iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png',
      temperature: 18.2,
      description: '曇り',
    },
    {
      dateTime: 1609480800,
      iconUrl: 'https://openweathermap.org/img/wn/10d@2x.png',
      temperature: 12.0,
      description: '雨',
    },
  ];

  it('全ての天気データが表示される', () => {
    render(<WeatherList items={mockItems} />);

    // 各アイテムの気温が表示されることを確認
    expect(screen.getByText('15.5℃')).toBeInTheDocument();
    expect(screen.getByText('18.2℃')).toBeInTheDocument();
    expect(screen.getByText('12℃')).toBeInTheDocument();
  });
});
