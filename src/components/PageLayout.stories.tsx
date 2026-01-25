import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';

const meta = {
  title: 'Components/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なPageLayoutの使用例
 */
export const Basic: Story = {
  args: {
    children: (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">ページタイトル</h1>
        <p className="text-gray-600">ページのコンテンツがここに表示されます</p>
      </div>
    ),
  },
};

/**
 * カードコンテンツを含むレイアウト
 * PageLayoutがmax-widthとセンタリングを提供
 */
export const WithCard: Story = {
  args: {
    children: (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">カードタイトル</h2>
        <p className="text-gray-600">
          カード内のコンテンツです。PageLayoutは背景、パディング、max-width、センタリングを提供します。
        </p>
      </div>
    ),
  },
};

/**
 * 複数の要素を含むレイアウト
 * PageLayoutがmax-widthとセンタリングを提供
 */
export const WithMultipleElements: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">セクション1</h2>
          <p className="text-gray-600">最初のセクションのコンテンツ</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">セクション2</h2>
          <p className="text-gray-600">2番目のセクションのコンテンツ</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">セクション3</h2>
          <p className="text-gray-600">3番目のセクションのコンテンツ</p>
        </div>
      </div>
    ),
  },
};
