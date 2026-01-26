import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WeatherList } from './WeatherList';

describe('WeatherList', () => {
  const mockItems = [
    {
      dateTime: '2021-01-01 00:00:00',
      iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
      temperature: 15.5,
      description: '晴れ',
    },
    {
      dateTime: '2021-01-01 03:00:00',
      iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png',
      temperature: 18.2,
      description: '曇り',
    },
    {
      dateTime: '2021-01-01 06:00:00',
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

  it('最初のアイテムに日付ラベルが表示される', () => {
    render(<WeatherList items={mockItems} />);

    // 日付ラベルが表示されることを確認
    const dateLabels = screen.getAllByTestId('date-label');
    expect(dateLabels).toHaveLength(1);
  });

  it('日付が変わると新しい日付ラベルが表示される', () => {
    const itemsWithDateChange = [
      {
        dateTime: '2021-01-01 00:00:00',
        iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
        temperature: 15.5,
        description: '晴れ',
      },
      {
        dateTime: '2021-01-02 03:00:00',
        iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png',
        temperature: 18.2,
        description: '曇り',
      },
      {
        dateTime: '2021-01-03 06:00:00',
        iconUrl: 'https://openweathermap.org/img/wn/10d@2x.png',
        temperature: 12.0,
        description: '雨',
      },
    ];

    render(<WeatherList items={itemsWithDateChange} />);

    // 3つの日付ラベルが表示されることを確認（日付が変わるたびに表示される）
    const dateLabels = screen.getAllByTestId('date-label');
    expect(dateLabels).toHaveLength(3);
  });
});
