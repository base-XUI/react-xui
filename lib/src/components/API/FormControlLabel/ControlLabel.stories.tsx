import type { Meta, StoryObj } from "@storybook/react";

import { FormControlLabel } from "./FormControlLabel";
import { Controls, Story } from "@storybook/blocks";

const meta = {
  title: "Inputs/FormControlLabel",
  parameters: {
    layout: "centered",
    docs: {
      page: () => <Controls />,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    control: {
      control: { disable: true },
      table: {
        defaultValue: { summary: "-" },
        type: { summary: "element" },
        detail: "ReactElement<CheckboxProps | RadioProps | SwitchProps>",
      },

      description:
        "	A control element. For instance, it can be a Radio, a Switch or a Checkbox.",
    },
    checked: {
      control: { disable: false },
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "If true, the checkbox is checked. Use this in controlled components with onChange.",
    },

    disabled: {
      control: { disable: false },
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description: "If true, the control is disabled.",
    },
    inputRef: {
      control: { disable: false },
      table: {
        defaultValue: { summary: "-" },
        type: { summary: "ref" },
      },
      description: "Pass a ref to the input element.",
    },
    label: {
      control: { disable: false },
      table: {
        defaultValue: { summary: "string" },
        type: { summary: "node", detail: "node Or string" },
      },
      description:
        "A text or an element to be used in an enclosing label element.",
    },
    labelPlacement: {
      control: { disable: false },
      table: {
        defaultValue: { summary: "end" },
        type: {
          summary: `'bottom'| 'end'| 'start'| 'top'`,
        },
      },
      description: " The position of the label. ",
    },

    required: {
      control: { disable: true },
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    value: {
      control: { disable: true },
      defaultValue: "-",
      table: {
        defaultValue: { summary: "-" },
        type: { summary: "any" },
      },
      description: "The value of the component.",
    },
  },
  args: {
    control: undefined,
    checked: false,
    disabled: false,
    inputRef: undefined,
    label: "Label Name",
    labelPlacement: "end",
    onChange: () => {},
    required: false,
    value: "Subscribe",
  },
} satisfies Meta<typeof FormControlLabel>;

export default meta;

type Story = StoryObj<typeof FormControlLabel>;
export const WithCheckboxes: Story = {
  render: () => {
    return <FormControlLabel label="Label" control={<div>Control</div>} />;
  },
};
