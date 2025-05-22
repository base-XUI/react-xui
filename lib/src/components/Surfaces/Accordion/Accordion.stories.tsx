import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
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
    defaultExpanded: {
      description: "If true, expands the accordion by default.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    expanded: {
      description: "If true, expands the accordion (controlled mode).",
      control: "boolean",
      table: {
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
    disableGutters: {
      description:
        "If true, removes the default gutters (padding) from the accordion.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: { control: "text" },
    children: { control: "text" },
    square: {
      description: "If true, the accordion will have square corners.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "If true, disables the accordion.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    onchange: fn(),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic variants
export const Basic: Story = {
  args: {
    children: "Accordion content goes here.",
  },
  render: () => (
    <>
      <Accordion title="Controlled Accordion" id="accordion-1">
        <AccordionSummary>Accordion1</AccordionSummary>
        <AccordionDetails>
          <p>This is the Accordion content.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion title="Controlled Accordion" id="accordion-2">
        <AccordionSummary>Accordion2</AccordionSummary>
        <AccordionDetails>
          <p>This is the Accordion content.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion title="Controlled Accordion" id="accordion-3">
        <AccordionSummary>Accordion3</AccordionSummary>
        <AccordionDetails>
          <p>This is the Accordion content.</p>
        </AccordionDetails>
      </Accordion>
    </>
  ),
};

export const DefaultExpanded: Story = {
  args: {
    title: "Expanded by default",
    children: "This accordion starts open.",
    defaultExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Accordion",
    children: "You cannot interact with this.",
    disabled: true,
  },
};

export const Controlled: Story = {
  args: {
    expanded: true,
  },
  render: () => (
    <Accordion title="Controlled Accordion" id="accordion-1">
      <AccordionSummary>Click Me</AccordionSummary>
      <AccordionDetails>
        <p>This is the Accordion content.</p>
      </AccordionDetails>
    </Accordion>
  ),
};
