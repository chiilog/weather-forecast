import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { CityListItem } from './CityListItem';

const meta = {
  title: 'Components/CityListItem',
  component: CityListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CityListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokyo: Story = {
  args: {
    city: { id: 'tokyo', name: '東京', nameEn: 'Tokyo' },
  },
};

export const Hyogo: Story = {
  args: {
    city: { id: 'hyogo', name: '兵庫', nameEn: 'Hyogo' },
  },
};

export const Oita: Story = {
  args: {
    city: { id: 'oita', name: '大分', nameEn: 'Oita' },
  },
};

export const Hokkaido: Story = {
  args: {
    city: { id: 'hokkaido', name: '北海道', nameEn: 'Hokkaido' },
  },
};
