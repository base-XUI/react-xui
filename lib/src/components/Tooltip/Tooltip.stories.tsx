import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { tooltipVariantsConfig } from "./variants";
import { Tooltip } from ".";


// Extract variant options directly from the config
const interactiveOptions = Object.keys(tooltipVariantsConfig.variants.interactive);
const placementOptions = Object.keys(tooltipVariantsConfig.variants.placement);
const colorOptions = Object.keys(tooltipVariantsConfig.variants.color);
const arrowOptions = Object.keys(tooltipVariantsConfig.variants.arrow);

const meta = {
    title: "Inputs/Button",
    component: Tooltip,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A versatile button component that supports different variants, placements, colors, and states.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        placement: {
            description: "placement of the button",
            options: placementOptions,
            control: { type: "select" },
            table: {
                defaultValue: { summary: tooltipVariantsConfig.defaultVariants.placement },
            },
        },
        color: {
            description: "Color scheme of the button",
            options: colorOptions,
            control: { type: "select" },
            table: {
                defaultValue: { summary: tooltipVariantsConfig.defaultVariants.color },
            },
        },
        arrow: {
            description: "Style variant of the button",
            options: arrowOptions,
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: String(tooltipVariantsConfig.defaultVariants.arrow) },
            },
        },
        interactive: {
            description: "Style variant of the button",
            options: interactiveOptions,
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: String(tooltipVariantsConfig.defaultVariants.interactive) },
            },
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
        disabled: {
            description: "Disables the button",
            control: "boolean",
            table: {
                defaultValue: { summary: "false" },
            },
        },
        as: {
            description: "The component used for the root node",
            control: { type: "text" },
            table: {
                defaultValue: { summary: "button" },
            },
        },
        component: {
            description: "The component used for the root node",
            control: { type: "text" },
            table: {
                defaultValue: { summary: "button" },
            },
        },
    },
    args: {
        onClick: fn(),
        children: "Button",
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic variants
export const Contained: Story = {
    args: {
        variant: "contained",
        color: "primary",
    },
};
