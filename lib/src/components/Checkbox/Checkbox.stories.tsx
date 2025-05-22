import { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Check, Minus } from "lucide-react";

import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "./Checkbox.types";
import { useArgs } from "storybook/internal/preview-api";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,

  parameters: {
    layout: "centered",
    Description:
      "A checkbox is an input control used to select one or more options from a list.",

    docs: {
      page: () => {
        return (
          <>
            <Title />
            <Subtitle
              children={
                "A checkbox is an input control used to select one or more options from a list."
              }
            />
            <Canvas />
            <Controls />
          </>
        );
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Following MUI Checkbox API documentation ordering
    checked: {
      control: "boolean",
      description: "If true, the component is checked.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checkedIcon: {
      control: { disable: true },
      description: "The icon to display when the component is checked.",
      table: {
        type: {
          summary: "ReactElement",
          detail: "Accepts any icon as React element",
        },
        defaultValue: { summary: "<Check />" },
      },
    },

    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "muted",
      ],
      description: "The color of the component.",
      table: {
        type: {
          summary:
            "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'muted' | string",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    defaultChecked: {
      control: "boolean",
      description:
        "The default checked state. Use when the component is not controlled.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "If true, the checkbox is disabled.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    icon: {
      control: { disable: true },
      description: "The icon to display when the component is unchecked.",
      table: {
        type: { summary: "ReactElement" },
        defaultValue: { summary: "<Check />" },
      },
    },
    id: {
      control: "text",
      description: "The id of the input element.",
      table: {
        type: { summary: "string" },
      },
    },
    indeterminate: {
      control: "boolean",
      description: "If true, the component appears indeterminate.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    indeterminateIcon: {
      control: { disable: true },
      description: "The icon to display when the component is indeterminate.",
      table: {
        type: { summary: "ReactElement" },
        defaultValue: { summary: "null" },
      },
    },

    onChange: {
      action: "changed",
      description: "Callback fired when the state is changed.",
      table: {
        type: { summary: "function" },
        detail: "function(event: React.ChangeEvent) => void",
      },
    },
    required: {
      control: "boolean",
      description: "If true, the input element is required.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the component.",
      table: {
        type: { summary: "'small' | 'medium' | 'large' | string" },
        defaultValue: { summary: "'medium'" },
      },
    },
    slotProps: {
      control: { disable: true },
      description: "The props used for each slot inside.",
      table: {
        type: { summary: "{ input?: func | object, root?: func | object }" },
        defaultValue: { summary: "{}" },
      },
    },

    value: {
      control: { disable: true },
      description: "The value of the component.",
      table: {
        type: { summary: "any" },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default Story
export const Default: Story = {
  args: {
    id: "my-checkbox",
    checked: false,
    color: "primary",
    size: "medium",
    required: false,
    disabled: false,
    defaultChecked: true,
    indeterminate: false,
    checkedIcon: <Check />,
    indeterminateIcon: <Minus />,
    onChange: () => {},
    value: "Subscribe",
  } as CheckboxProps,
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked }); // Update the args.checked prop
    };

    return (
      <Checkbox
        {...args}
        defaultChecked={args.defaultChecked}
        id="my-checkbox"
        checked={checked || args.checked || args.defaultChecked}
        onChange={handleChange}
      />
    );
  },
};

// With Slot Props Story
export const WithSlotProps: Story = {
  args: {
    id: "my-checkbox",
    checked: false,
    color: "primary",
    size: "medium",
    required: false,
    disabled: false,
    indeterminate: false,
    checkedIcon: <Check />,
    indeterminateIcon: <Minus />,
    onChange: () => {},
    value: "Subscribe",
    slotProps: {
      root: {
        className: "custom-slotProps-root-class",
        ["slotProps-root-data-custom" as string]: "true",
      },
      input: {
        style: { cursor: "pointer" },
        title: "custom-slotProps-input-title",
        name: "custom-slotProps-input-name",
      },
    },
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked }); // Update the args.checked prop
    };

    return (
      <Checkbox
        {...args}
        id="my-checkbox"
        checked={checked || args.checked}
        onChange={handleChange}
      />
    );
  },
};
