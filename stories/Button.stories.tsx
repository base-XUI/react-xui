import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@/components/core/Button";
import type { ComponentProps } from "@/types/polymorphic";
import { buttonVariantsConfig } from "@/components/core/Button/variants";

// Extract variant options directly from the config
const variantOptions = Object.keys(buttonVariantsConfig.variants.variant);
const sizeOptions = Object.keys(buttonVariantsConfig.variants.size);

const meta = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports different variants, sizes, and states.",
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
    size: {
      description: "Size of the button",
      options: sizeOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.size },
      },
    },
    fullWidth: {
      description: "Whether the button should take full width",
      control: "boolean",
      table: {
        defaultValue: {
          summary: String(buttonVariantsConfig.defaultVariants.fullWidth),
        },
      },
    },
    isLoading: {
      description: "Loading state of the button",
      control: "boolean",
    },
    disabled: {
      description: "Disabled state of the button",
      control: "boolean",
    },
    children: {
      description: "Button content",
      control: "text",
    },
    leftIcon: {
      description: "Icon element to show before the button text",
    },
    rightIcon: {
      description: "Icon element to show after the button text",
    },
    className: {
      description: "Additional CSS classes",
      control: "text",
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
type ButtonLinkStory = StoryObj<typeof Button> & {
  args: ComponentProps<"a"> & Partial<typeof Button>;
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: "👈",
    rightIcon: "👉",
    children: "With Icons",
  },
};

// Example of using as a different element
export const AsLink: ButtonLinkStory = {
  args: {
    as: "a",
    href: "#",
    children: "Link Button",
  },
};

export const AsCustomElement: ButtonStory = {
  args: {
    as: "div",
    role: "button",
    children: "Custom Element Button",
  },
};

// Example showing all variants together
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
};
