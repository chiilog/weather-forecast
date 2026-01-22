import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WeatherListItem } from './WeatherListItem';

describe('WeatherListItem', () => {
  const mockIconUrl = 'https://openweathermap.org/img/wn/01d@2x.png';

  it('日時が表示される', () => {
    render(
      <WeatherListItem
        dateTime="1609459200"
        iconUrl={mockIconUrl}
        temperature={15.5}
        description="晴れ"
      />
    );

    expect(screen.getByText(/01\/01/)).toBeInTheDocument();
  });

  it('天気アイコンが表示される', () => {
    render(
      <WeatherListItem
        dateTime="1609459200"
        iconUrl={mockIconUrl}
        temperature={15.5}
        description="晴れ"
      />
    );

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', mockIconUrl);
  });

  it('気温が表示される', () => {
    render(
      <WeatherListItem
        dateTime="1609459200"
        iconUrl={mockIconUrl}
        temperature={15.5}
        description="晴れ"
      />
    );

    expect(screen.getByText('15.5℃')).toBeInTheDocument();
  });

  it('天気の説明が表示される', () => {
    render(
      <WeatherListItem
        dateTime="1609459200"
        iconUrl={mockIconUrl}
        temperature={15.5}
        description="晴れ"
      />
    );

    expect(screen.getByText('晴れ')).toBeInTheDocument();
  });
});
