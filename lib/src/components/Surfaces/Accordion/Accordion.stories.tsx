import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";
import { Typography } from "@/components/system-design/Typography";

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
  subcomponents: { AccordionSummary, AccordionDetails }, // Add AccordionSummary and AccordionDetails components

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A vertically stacked set of interactive headings that each reveal a section of content.",
      },
      subComponents: {
        AccordionSummary:
          "The summary of the accordion, which is clickable to expand/collapse.",
        AccordionDetails:
          "The details of the accordion that are shown/hidden when expanded.",
      },
    },
  },
  tags: ["autodocs"],

  argTypes: {
    component: {
      description: "The component used for the root node",
      control: false,
      table: {
        defaultValue: { summary: "div" },
      },
    },
    children: {
      description:
        "The content of the component (typically AccordionSummary and AccordionDetails).",
      control: false,
      table: {
        type: { summary: "node" },
      },
    },
    defaultExpanded: {
      description: "If true, expands the accordion by default.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      description:
        "Callback fired when the expand/collapse state changes. Receives the event and the new expanded state.",
      table: {
        type: {
          summary: "(event: React.SyntheticEvent, expanded: boolean) => void",
        },
      },
    },

    disableGutters: {
      description:
        "If true, removes the default gutters (margin) from the accordion.",
      control: "boolean",

      table: {
        type: { summary: "boolean" },

        defaultValue: { summary: "false" },
      },
    },

    expanded: {
      description: "If true, expands the accordion (controlled mode).",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    expandIcon: {
      description:
        "The icon element to display as the expand/collapse indicator.",
      control: "text",
      table: {
        type: { summary: "node" },
      },
    },

    square: {
      description: "If true, the accordion will have square corners.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "If true, disables the accordion.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },

  args: {
    children: "Accordion",
    onChange: fn(),
  },
  render: ({ expandIcon, ...args }) => (
    <>
      {Array.from([1, 2, 3], (index) => (
        <Accordion
          {...args}
          key={index}
          defaultExpanded={args.defaultExpanded && index === 1}
          disabled={args.disabled && index === 3}
        >
          <AccordionSummary expandIcon={expandIcon} id={`pane${index}-summary`}>
            <Typography component="span" variant="body3">
              Accordion{index}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            this is content of accordion {index}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic variants
export const Basic: Story = {};

// DefaultExpanded variant
export const DefaultExpanded: Story = {
  args: {
    defaultExpanded: true,
  },
};
// Disabled variant
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
// DisableGutters variant
export const DisableGutters: Story = {
  args: {
    disableGutters: true,
    defaultExpanded: true,
  },
};
// Controlled variant
export const Controlled: Story = {
  //still in coding
  args: {
    expanded: true,
  },
};
// Squared variant
export const Squared: Story = {
  args: {
    square: true,
  },
};
