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
                defaultValue: { summary: tooltipVariantsConfig.defaultVariants.placement },
            },
        },
        color: {
            description: "Color scheme of the tooltip",
            options: colorOptions,
            control: { type: "select" },
            table: {
                defaultValue: { summary: tooltipVariantsConfig.defaultVariants.color },
            },
        },
        arrow: {
            description: "Whether the tooltip includes an arrow",
            options: arrowOptions,
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: String(tooltipVariantsConfig.defaultVariants.arrow) },
            },
        },
        interactive: {
            description: "Whether the tooltip is interactive",
            options: interactiveOptions,
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: String(tooltipVariantsConfig.defaultVariants.interactive) },
            },
        },
        loading: {
            description: "Loading state of the tooltip",
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
            description: "Whether the tooltip should take full width",
            control: "boolean",
        },
        startIcon: {
            description: "Icon element to show before the tooltip text",
        },
        endIcon: {
            description: "Icon element to show after the tooltip text",
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
        component: {
            description: "The component used for the root node",
            control: { type: "text" },
            table: {
                defaultValue: { summary: "span" },
            },
        },
    },
    args: {
        onClick: fn(),
        children: "Hover me",
        title: "Tooltip text",
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    args: {
        placement: "bottom",
        arrow: true,
    },
};

export const AllPlacements: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            {placementOptions.map((placeOption) => (
                <Tooltip key={placeOption} title={`Placement: ${placeOption}`} placement={placeOption}>
                    <span className="border p-2">{placeOption}</span>
                </Tooltip>
            ))}
        </div>
    ),
};
export const GoodToolTip: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            <Tooltip title={`Placement: The title`} onOpen={(event) => console.log(event.target)} onClose={() => console.log("3ady33333")}>
                <span className="border p-2">{"inside the tooltip"}</span>
            </Tooltip>
        </div>
    ),
};