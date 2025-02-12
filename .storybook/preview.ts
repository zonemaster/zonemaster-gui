import type { Preview } from '@storybook/svelte';
import '../src/styles/site.css';
import '../src/assets/fonts/bootstrap-icons.min.css';

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
