import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Inputs/Checkbox",
  parameters: {
    layout: "centered",
    docs: {
      stories: ["Default"],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "If true, the checkbox is checked. Use this in controlled components with onChange.",
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
      table: {
        defaultValue: { summary: "primary" },
      },
      description:
        "Sets the color of the checkbox. Useful for indicating intent or priority (e.g., success, error).",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
        type: { summary: "string" },
      },
      description:
        "Controls the visual size of the checkbox. Choose based on UI density and readability needs.",
    },
    disabled: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "If true, the checkbox cannot be interacted with and appears visually inactive.",
    },
    required: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "If true, the checkbox must be checked before form submission. Useful for mandatory selections.",
    },
    checkedIcon: {
      control: { disable: true },
      options: [],
      table: {
        type: { summary: "node" },
        defaultValue: { summary: "<CheckmarkIcon />" },
      },
      description:
        "Custom icon shown when the checkbox is checked. Defaults to a checkmark if not provided.",
    },
    icon: {
      control: { disable: true },
      options: [],
      table: {
        type: { summary: "node" },
        defaultValue: { summary: "<CheckmarkIcon />" },
      },
      description: "The icon to display when the component is unchecked..",
    },
    indeterminate: {
      control: "boolean",
      options: [false, true],
      description:
        "If true, shows an indeterminate state. Typically used in parent checkboxes representing a group selection.",
    },
    indeterminateIcon: {
      control: { disable: true },
      options: [],
      table: {
        type: { summary: "node" },
        defaultValue: { summary: "null" },
      },
      description:
        "Custom icon shown when the checkbox is in an indeterminate state. If not provided, no icon is shown.",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxExample: Story = {
  args: {
    checked: false,
    color: "primary",
    size: "medium",
    required: false,
    disabled: false,
    indeterminate: false,
    checkedIcon: null,
    indeterminateIcon: null,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked }); // Update the checked state
    };

    return (
      <Checkbox
        {...args}
        checked={checked} // Ensure checked is controlled
        onChange={handleChange1} // Handle changes
      />
    );
  },
};

// Add a new story for E2E testing with data-testid attributes
// Checkbox.stories.tsx
export const E2ETestingVariants: Story = {
  args: {
    checked: false,
    color: "primary",
    size: "medium",
    required: false,
    disabled: false,
    indeterminate: false,
    checkedIcon: null,
    indeterminateIcon: null,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked }); // Update the checked state
    };
    return (
      <>
        <Checkbox
          {...args}
          color="primary"
          checked={checked} // Ensure checked is controlled
          onChange={handleChange1} // Handle changes
        />
      </>
    );
  },
};
export const E2ETestingDisabled: Story = {
  args: {
    checked: false,
    color: "primary",
    size: "medium",
    required: false,
    disabled: false,
    indeterminate: false,
    checkedIcon: null,
    indeterminateIcon: null,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked }); // Update the checked state
    };
    return (
      <>
        <Checkbox
          {...args}
          color="primary"
          checked={checked || args.checked} // Ensure checked is controlled
          onChange={handleChange1} // Handle changes
        />
      </>
    );
  },
};
