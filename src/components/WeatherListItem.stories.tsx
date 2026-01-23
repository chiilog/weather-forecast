import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherListItem } from './WeatherListItem';

const meta = {
  title: 'Components/WeatherListItem',
  component: WeatherListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sunny: Story = {
  args: {
    dateTime: 1705752000,
    iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
    temperature: 15.5,
    description: '快晴',
  },
};

export const Rainy: Story = {
  args: {
    dateTime: 1705762800,
    iconUrl: 'https://openweathermap.org/img/wn/10d@2x.png',
    temperature: 12.3,
    description: '小雨',
  },
};

export const Snowy: Story = {
  args: {
    dateTime: 1705773600,
    iconUrl: 'https://openweathermap.org/img/wn/13d@2x.png',
    temperature: -2.1,
    description: '雪',
  },
};

export const Night: Story = {
  args: {
    dateTime: 1705784400,
    iconUrl: 'https://openweathermap.org/img/wn/01n@2x.png',
    temperature: 8.7,
    description: '晴れ',
  },
};
