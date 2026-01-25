import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: '天気予報アプリ',
    showBackButton: false,
  },
};

export const WithBackButton: Story = {
  args: {
    title: '東京の天気',
    showBackButton: true,
    backTo: '/',
  },
};

export const CustomBackTo: Story = {
  args: {
    title: 'カスタムページ',
    showBackButton: true,
    backTo: '/custom',
  },
};
