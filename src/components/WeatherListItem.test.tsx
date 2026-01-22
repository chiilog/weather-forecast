import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { WeatherListItem } from './WeatherListItem';

describe('WeatherListItem', () => {
  const mockProps = {
    dateTime: 1609459200,
    iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
    temperature: 15.5,
    description: '晴れ',
  };

  beforeEach(() => {
    render(<WeatherListItem {...mockProps} />);
  });

  it('日時が "MM/DD HH:mm" 形式で表示される', () => {
    // タイムスタンプ 1609459200 は UTC で 2021-01-01 00:00:00
    expect(screen.getByText('01/01 00:00')).toBeInTheDocument();
  });

  it('天気アイコンが表示される', () => {
    const icon = screen.getByRole('img', { name: mockProps.description });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', mockProps.iconUrl);
  });

  it('気温が表示される', () => {
    expect(screen.getByText(`${mockProps.temperature}℃`)).toBeInTheDocument();
  });

  it('天気の説明が表示される', () => {
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });
});
