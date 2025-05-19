// Tooltip.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tooltip } from ".";
import { tooltipVariantsConfig } from "./variants";

// Extract variant options from config
const placementOptions = Object.keys(tooltipVariantsConfig.variants.placement);
const colorOptions = Object.keys(tooltipVariantsConfig.variants.color);

type PlacementOption = keyof typeof tooltipVariantsConfig.variants.placement;

const meta: Meta<typeof Tooltip> = {
  title: "Inputs/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile tooltip component that supports different variants, placements, colors, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      description: "Placement of the tooltip",
      options: placementOptions,
      control: { type: "select" },
      table: {
        defaultValue: {
          summary: tooltipVariantsConfig.defaultVariants.placement,
        },
      },
    },
    color: {
      description: "Color scheme of the tooltip",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: {
          summary: tooltipVariantsConfig.defaultVariants.color,
        },
      },
    },
    arrow: {
      description: "Whether the tooltip includes an arrow",
      control: { type: "boolean" },
      table: {
        defaultValue: {
          summary: String(tooltipVariantsConfig.defaultVariants.arrow),
        },
      },
    },
    interactive: {
      description: "Whether the tooltip is interactive",
      control: { type: "boolean" },
      table: {
        defaultValue: {
          summary: String(tooltipVariantsConfig.defaultVariants.interactive),
        },
      },
    },
    disabled: {
      description: "Disables the tooltip",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    as: {
      description: "The component used for the root node",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "span" },
      },
    },
    children: {
      control: false,
    },
  },
  args: {
    onClick: fn(),
    title: "Tooltip text",
    placement: "bottom",
    arrow: true,
    interactive: true,
    children: <span className="rounded border p-2">Hover me</span>,
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    interactive: true,
    arrow: true,
    disabled: false,
    title: "Tooltip text",
    placement: "top",
    color: "primary",
    as: "",
  },
};

export const AllPlacements: Story = {
  args: {
    arrow: true,
    interactive: true,
    disabled: false,
  },

  render: (args) => (
    <div className="grid grid-cols-3 gap-12">
      {placementOptions.map((placeOption) => (
        <Tooltip
          {...args}
          key={placeOption}
          title={`Placement: ${placeOption}`}
          placement={placeOption as PlacementOption}
        >
          <span className="rounded border p-2">{placeOption}</span>
        </Tooltip>
      ))}
    </div>
  ),
};
