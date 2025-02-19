import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import {
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_ALIGNMENTS,
  type TypographyVariant,
  type TypographyColor,
  type TypographyAlignment,
} from "./variants";

// Type-safe options
const variantOptions = Object.keys(TYPOGRAPHY_VARIANTS) as TypographyVariant[];
const colorOptions = Object.keys(TYPOGRAPHY_COLORS) as TypographyColor[];
const alignOptions = Object.keys(
  TYPOGRAPHY_ALIGNMENTS,
) as TypographyAlignment[];

const meta = {
  title: "System Design/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile typography component that supports different variants, colors, and alignments.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Typography variant",
      options: variantOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "body1" },
      },
    },
    color: {
      description: "Text color",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "monochrome" },
      },
    },
    align: {
      description: "Text alignment",
      options: alignOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "start" },
      },
    },
    noWrap: {
      description: "Prevent text wrapping",
      control: "boolean",
    },
    gutterBottom: {
      description: "Add margin to bottom",
      control: "boolean",
    },
    paragraph: {
      description: "Render as paragraph with margin",
      control: "boolean",
    },
    children: {
      description: "Text content",
      control: "text",
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

// Basic stories
export const Heading1: Story = {
  args: {
    variant: "h1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
  },
};

export const Subtitle1: Story = {
  args: {
    variant: "subtitle1",
  },
};

export const ColorVariant: Story = {
  args: {
    color: "primary",
  },
};

export const CenteredText: Story = {
  args: {
    align: "center",
  },
};

export const NoWrap: Story = {
  args: {
    noWrap: true,
    children: "This is a very long text that should not wrap to the next line",
  },
};

// Example showing all variants together
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variantOptions.map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant}: The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};

// Example showing all colors
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {colorOptions.map((color) => (
        <Typography key={color} color={color}>
          {color}: The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};

// Example showing different alignments
export const Alignments: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      {alignOptions.map((align) => (
        <Typography key={align} align={align}>
          {align} aligned text
        </Typography>
      ))}
    </div>
  ),
};
