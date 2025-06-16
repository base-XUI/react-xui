import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";
import { Typography } from "@/components/system-design/Typography";
import { ArrowDown } from "lucide-react";

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
  subcomponents: { AccordionSummary, AccordionDetails }, // Add AccordionSummary and AccordionDetails components
  parameters: {
    layout: "centered",
    docs: {
      toc: {
        title: "Contents",
      },
      description: {
        component: `A vertically stacked set of interactive headings that each reveal a section of content.
        \nAccordion: the wrapper for grouping related components.
        \nAccordion Summary: the wrapper for the Accordion header, which expands or collapses the content when clicked.
        \nAccordion Details: the wrapper for the Accordion content.`,
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
      control: "object",
      table: {
        type: { summary: "node" },
      },
    },

    square: {
      description: "If true, the accordion will remove square corners.",
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
    slots: {
      description: "Slot overrides for internal components like heading",
      control: false,
      table: {
        type: { summary: "{ heading?: { component?: 'h3' } }" },
      },
    },
    classes: {
      description: "Override or extend the styles applied to the component.",
      control: false,
      table: {
        type: { summary: "{ root,summary,details}" },
      },
    },
  },

  args: {
    children: "Accordion",
    onChange: fn(),
  },
  render: ({ expanded, expandIcon, ...args }) => (
    <div className="w-100 max-w-xs">
      {/* Render multiple accordions */}
      {Array.from([1, 2, 3], (index) => (
        <Accordion
          {...args}
          key={index}
          defaultExpanded={args.defaultExpanded && index === 1}
          slots={args.slots}
          disabled={args.disabled && index === 3}
        >
          <AccordionSummary
            expandIcon={
              expandIcon !== undefined && index === 1 ? expandIcon : undefined
            }
            id={`panel${index}-summary`}
          >
            Accordion{index}
          </AccordionSummary>
          <AccordionDetails>
            this is content of accordion {index}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic variants
export const Basic: Story = {
  args: {},
};
//expanded Icon variant
export const ExpandedIcon: Story = {
  args: {
    expandIcon: <ArrowDown />,
  },
};
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
export const Controlled: Story = {
  args: { expanded: true },
  parameters: {
    docs: {
      source: {
        code: `
         const Controlled=(props: typeof args) =>{
      const [expanded, setExpanded] = React.useState<string | false>(false);

      const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(
            () => (
              props?.onChange?.(event, isExpanded), isExpanded ? panel : false
            ),
          );
        };

      return Array.from([1, 2, 3], (index) => (
        <Accordion
          expanded={expanded === panel{index}}
          onChange={handleChange(panel{index})}
        >
          <AccordionSummary
            aria-controls={panel{index}-content}
            id={panel{index}-summary}
          >
            <Typography component="span" variant="body3">
              Accordion{index}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            this is content of accordion {index}
          </AccordionDetails>
        </Accordion>
      ))
    }`,
        language: "tsx",
        type: "code",
      },
    },
  },
  render: () => <ControlledComponent />,
};
const ControlledComponent = (
  props: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(() => {
        props?.onChange?.(event, isExpanded);
        return isExpanded ? panel : false;
      });
    };

  return (
    <div className="w-100 max-w-xs">
      {Array.from([1, 2, 3], (index) => {
        const panel = `panel${index}`;
        return (
          <Accordion
            key={panel}
            expanded={expanded === panel}
            onChange={handleChange(panel)}
            {...props} // Spread the props to allow for custom classes, slots, etc.
          >
            <AccordionSummary
              aria-controls={`${panel}-content`}
              id={`${panel}-summary`}
            >
              <Typography component="span" variant="body3">
                Accordion{index}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              this is content of accordion {index}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

// Squared variant
export const Squared: Story = {
  args: {
    square: true,
  },
};
// Changing heading of summary from h3 to h4
export const ChangingHeadingLevel: Story = {
  args: {
    slots: { heading: { component: "h4" } },
  },
};
