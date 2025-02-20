import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";
import { buttonVariantsConfig } from "./variants";

// Extract variant options directly from the config
const variantOptions = Object.keys(buttonVariantsConfig.variants.variant);
const colorOptions = Object.keys(buttonVariantsConfig.variants.color);
const sizeOptions = Object.keys(buttonVariantsConfig.variants.size);

const meta = {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports different variants, sizes, colors, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Style variant of the button",
      options: variantOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.variant },
      },
    },
    color: {
      description: "Color scheme of the button",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.color },
      },
    },
    size: {
      description: "Size of the button",
      options: sizeOptions,
      control: { type: "select" },
    },
    loading: {
      description: "Loading state of the button",
      control: "boolean",
    },
    loadingPosition: {
      description: "Position of the loading indicator",
      options: ["start", "center", "end"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "center" },
      },
    },
    disableElevation: {
      description: "Disable elevation (shadow)",
      control: "boolean",
    },
    fullWidth: {
      description: "Whether the button should take full width",
      control: "boolean",
    },
    startIcon: {
      description: "Icon element to show before the button text",
    },
    endIcon: {
      description: "Icon element to show after the button text",
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;
type ButtonStory = StoryObj<typeof Button>;
type ButtonLinkStory = StoryObj<typeof Button>;

// Basic variants
export const Contained: Story = {
  args: {
    variant: "contained",
    color: "primary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    color: "primary",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    color: "primary",
  },
};

// Color variants
export const Success: Story = {
  args: {
    color: "success",
  },
};

export const Error: Story = {
  args: {
    color: "error",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
  },
};

export const Info: Story = {
  args: {
    color: "info",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
};

export const LoadingStart: Story = {
  args: {
    loading: true,
    loadingPosition: "start",
    children: "Loading",
  },
};

export const LoadingEnd: Story = {
  args: {
    loading: true,
    loadingPosition: "end",
    children: "Loading",
  },
};

// Example showing all variants together
export const ColorShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button component="a" target="_blank" color="primary">
          Primary
        </Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="text" color="primary">
          Primary
        </Button>
        <Button variant="text" color="success">
          Success
        </Button>
        <Button variant="text" color="error">
          Error
        </Button>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button loading loadingPosition="start">
        Start
      </Button>
      <Button loading loadingPosition="center">
        Center
      </Button>
      <Button loading loadingPosition="end">
        End
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    startIcon: "👈",
    endIcon: "👉",
    children: "With Icons",
  },
};

// Example of using as a different element
export const AsLink: ButtonLinkStory = {
  args: {
    component: "a",
    href: "#",
    children: "Link Button",
  },
};

export const AsCustomElement: ButtonStory = {
  args: {
    component: "div",
    role: "button",
    children: "Custom Element Button",
  },
};
