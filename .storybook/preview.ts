import type { Preview } from "@storybook/react";

import "../lib/main.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Installation", "Contribution"],
      },
    },
  },
};

export default preview;
