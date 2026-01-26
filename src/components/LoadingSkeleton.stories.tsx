import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSkeleton } from './LoadingSkeleton';

const meta = {
  title: 'Components/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewItems: Story = {
  args: {
    count: 3,
  },
};

export const ManyItems: Story = {
  args: {
    count: 10,
  },
};
