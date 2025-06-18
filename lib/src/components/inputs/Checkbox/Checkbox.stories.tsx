import { ChangeEvent, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "./Checkbox.types";
import { Check, Minus } from "lucide-react";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    Description:
      "A checkbox is an input control used to select one or more options from a list.",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "If true, the checkbox is checked.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checkedIcon: {
      control: { disable: true },
      description: "The icon shown when the checkbox is checked.",
      table: {
        type: {
          summary: "ReactElement",
          detail: "Accepts any React element like SVG or Icon component.",
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
      description: "Sets the color theme of the checkbox.",

      table: {
        type: {
          summary: "Select",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    defaultChecked: {
      control: "boolean",
      description:
        "Default state if the checkbox is not controlled by a parent component.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox so it cannot be interacted with.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: { disable: true },
      description: "The icon shown when the checkbox is unchecked.",
      table: {
        type: { summary: "ReactElement" },
        defaultValue: { summary: "<Check />" },
      },
    },
    id: {
      control: "text",
      description: "Unique identifier for the input element.",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Unique identifier for the input element.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "string" },
      },
    },
    indeterminate: {
      control: "boolean",
      description:
        "If true, the checkbox appears in an indeterminate (mixed) state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    indeterminateIcon: {
      control: { disable: true },
      description:
        "The icon shown when the checkbox is in indeterminate state.",
      table: {
        type: { summary: "ReactElement" },
        defaultValue: { summary: "null" },
      },
    },
    onChange: {
      action: "changed",
      description:
        "Callback function called whenever the checkbox state changes.",
      table: {
        type: { summary: "function" },
        detail: "function(event: React.ChangeEvent) => void",
      },
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required in forms.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls the visual size of the checkbox.",
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    slots: {
      control: { disable: false },
      description:
        "Allows passing custom props to internal elements like root or input.",
      table: {
        type: { summary: "{ root?: object, input?: object }" },
        defaultValue: {
          summary: "{}",
          detail: `slots: {
      root: "label",
      input: "input",
    }`,
        },
      },
    },
    slotProps: {
      control: { disable: false },
      description:
        "Allows passing custom props to internal elements like root or input.",

      table: {
        type: { summary: "{ root?: object, input?: object }" },
        defaultValue: {
          summary: "{}",
          detail: `
root:{
  className: "",
  ["slotProps-root-data-custom" as string]: "true",
   name: "custom-slotProps-input-name",
     },
input:{
  style: { cursor: "pointer" },
  title: "custom-slotProps-input-title",
 
      },
          `,
        },
      },
    },
    value: {
      control: { disable: true },
      description:
        "The value submitted with form data when the checkbox is checked.",
      table: {
        type: { summary: "any" },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    defaultChecked: false,
    indeterminate: false,
    required: false,
    disabled: false,
    color: "primary",
    size: "medium",
    id: "my-checkbox",
    value: "Subscribe",
    className: "",
    name: "controlled checkbox",
    checkedIcon: <Check />,
    indeterminateIcon: <Minus />,
    onChange: () => {},
  } as CheckboxProps,
  render: function Render(args) {
    const [{ _checked, defaultChecked }, updateArgs] = useArgs();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked, defaultChecked: false });
    };

    return (
      <Checkbox
        {...args}
        id="my-checkbox"
        checked={
          args.defaultChecked ? args.defaultChecked : _checked || args.checked
        }
        defaultChecked={defaultChecked ?? args.defaultChecked}
        onChange={handleChange}
      />
    );
  },
};

export const slotAndSlotProps: Story = {
  args: {
    defaultChecked: false,
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
    slots: {
      root: "label",
      input: "input",
    },
    slotProps: {
      root: {
        className: "custom-slotProps-root-class",
        ["slotprops-root-data-custom" as string]: "true",
      },
      input: {
        style: { cursor: "pointer" },
        title: "custom-slotProps-input-title",
        name: "custom-slotProps-input-name",
      },
    },
  },
  render: function Render(args) {
    const [{ checked, defaultChecked }, updateArgs] = useArgs();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      updateArgs({ checked: isChecked, defaultChecked: isChecked });
    };
    return (
      <Checkbox
        {...args}
        id="my-checkbox"
        checked={
          args.defaultChecked ? args.defaultChecked : checked || args.checked
        }
        defaultChecked={defaultChecked ?? args.defaultChecked}
        onChange={handleChange}
      />
    );
  },
};

export const IndeterminateExample: Story = {
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
    slots: {
      root: "label",
      input: "input",
    },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState([true, false]);

    const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked([checked[0], event.target.checked]);
    };

    const children = (
      <div className="m-3 grid items-center gap-3">
        <div className="flex items-center gap-2">
          <Checkbox {...args} checked={checked[0]} onChange={handleChange2} />
          <span>Child 1</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox {...args} checked={checked[1]} onChange={handleChange3} />
          <span>Child 2</span>
        </div>
      </div>
    );
    return (
      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            {...args}
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
          <span>Parent</span>
        </div>
        {children}
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render() {
    const checkedStates = {
      primary: false,
      secondary: false,
      success: false,
      error: false,
      info: false,
      warning: false,
      muted: false,
    };

    return (
      <div className="flex flex-wrap gap-4">
        {Object.keys(checkedStates).map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${color}`}
              name={`checkbox-${color}`}
              color={color as "primary"}
              size="medium"
              checkedIcon={<Check />}
              icon={undefined}
            />
            <span>{color}</span>
          </div>
        ))}
      </div>
    );
  },
};
