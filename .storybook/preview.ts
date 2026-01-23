import type { Preview } from '@storybook/react-vite';
import '../src/index.css'; // Tailwind CSSを読み込む

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
