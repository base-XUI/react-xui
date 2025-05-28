import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tooltip } from ".";
import { tooltipVariantsConfig } from "./variants";

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
    disableInteractive: {
      description: "Disables pointer and keyboard interaction with the tooltip",
      control: { type: "boolean" },
    },
    disabled: {
      description: "Disables the tooltip",
      control: "boolean",
    },
    disableFocusListener: {
      description: "Disables tooltip activation on focus",
      control: "boolean",
    },
    disableHoverListener: {
      description: "Disables tooltip activation on hover",
      control: "boolean",
    },
    disableTouchListener: {
      description: "Disables tooltip activation on touch",
      control: "boolean",
    },
    followCursor: {
      description: "Positions the tooltip relative to the cursor",
      control: "boolean",
    },
    enterDelay: {
      description: "Delay (in ms) before showing tooltip on hover/focus",
      control: { type: "number" },
      table: {
        defaultValue: { summary: "100" },
      },
    },
    enterNextDelay: {
      description: "Delay (in ms) for subsequent tooltip displays",
      control: { type: "number" },
      table: {
        defaultValue: { summary: "0" },
      },
    },
    enterTouchDelay: {
      description: "Delay (in ms) before showing tooltip on touch",
      control: { type: "number" },
      table: {
        defaultValue: { summary: "700" },
      },
    },
    leaveDelay: {
      description: "Delay (in ms) before hiding tooltip on hover/focus out",
      control: { type: "number" },
      table: {
        defaultValue: { summary: "0" },
      },
    },
    leaveTouchDelay: {
      description: "Delay (in ms) before hiding tooltip after touch end",
      control: { type: "number" },
      table: {
        defaultValue: { summary: "1500" },
      },
    },
    component: {
      description: "The HTML tag or React component used for the root node",
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
    placement: "top",
    arrow: true,
    color: "primary",
    component: "span",
    children: <span className="rounded border p-2">Hover me</span>,
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    title: "Tooltip text",
    placement: "top",
    color: "primary",
    arrow: true,
    disabled: false,
    disableInteractive: false,
    disableFocusListener: false,
    disableHoverListener: false,
    disableTouchListener: false,
    followCursor: false,
    enterDelay: 1000,
    enterNextDelay: 1000,
    enterTouchDelay: 700,
    leaveDelay: 1000,
    leaveTouchDelay: 1500,
    component: "span",
    children: <span className="rounded border p-2">Hover me</span>,
  },
};

export const AllPlacements: Story = {
  args: {
    arrow: true,
    disableInteractive: false,
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
          component="span"
        >
          <span className="rounded border p-2">{placeOption}</span>
        </Tooltip>
      ))}
    </div>
  ),
};
