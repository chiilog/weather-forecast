import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ErrorView } from './ErrorView';

const meta = {
  title: 'Components/ErrorView',
  component: ErrorView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * リトライボタンなしの基本的なエラー表示
 */
export const BasicError: Story = {
  args: {
    message: '都市が見つかりません',
    showRetryButton: false,
  },
};

/**
 * リトライボタンありのエラー表示
 */
export const RetryableError: Story = {
  args: {
    message: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};

/**
 * 401エラー - APIキーが無効
 */
export const UnauthorizedError: Story = {
  args: {
    message: 'APIキーが無効です。設定を確認してください。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};

/**
 * 404エラー - 都市が見つからない
 */
export const NotFoundError: Story = {
  args: {
    message: '指定された都市の天気情報が見つかりません。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};

/**
 * 429エラー - レート制限超過
 */
export const RateLimitError: Story = {
  args: {
    message:
      'APIのリクエスト制限を超過しました。しばらく待ってから再度お試しください。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};

/**
 * 500エラー - サーバーエラー
 */
export const ServerError: Story = {
  args: {
    message: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};

/**
 * 長いエラーメッセージ
 */
export const LongErrorMessage: Story = {
  args: {
    message:
      '予期しないエラーが発生しました。ネットワーク接続を確認するか、しばらく時間をおいてから再度お試しください。問題が解決しない場合は、管理者にお問い合わせください。',
    showRetryButton: true,
    onRetry: () => alert('リトライボタンがクリックされました'),
  },
};
