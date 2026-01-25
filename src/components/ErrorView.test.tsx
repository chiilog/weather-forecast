import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ErrorView } from './ErrorView';

describe('ErrorView', () => {
  it('showRetryButtonがfalseの場合、リトライボタンは表示されない', () => {
    render(
      <MemoryRouter>
        <ErrorView message="エラーが発生しました" showRetryButton={false} />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole('button', { name: '再試行' })
    ).not.toBeInTheDocument();
  });

  it('showRetryButtonがtrueでonRetryがある場合、リトライボタンが表示される', () => {
    render(
      <MemoryRouter>
        <ErrorView
          message="エラーが発生しました"
          showRetryButton={true}
          onRetry={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '再試行' })).toBeInTheDocument();
  });

  it('リトライボタンをクリックするとonRetryが呼ばれる', async () => {
    const onRetry = vi.fn();
    render(
      <MemoryRouter>
        <ErrorView
          message="エラーが発生しました"
          showRetryButton={true}
          onRetry={onRetry}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: '再試行' });
    await userEvent.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
