import { ChangeEvent, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";
import { RadioColor } from "./variants";

const meta = {
  title: "API/Radio",
  component: Radio,
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
        defaultValue: { summary: `<Circle />` },
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
        type: { summary: "select" },
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
        defaultValue: { summary: "-" },
      },
    },
    id: {
      control: "text",
      description: "Unique identifier for the input element.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
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
    onChange: {
      action: "changed",
      description:
        "Callback function called whenever the checkbox state changes.",
      table: {
        type: { summary: "function" },
        detail: "function(event: ChangeEvent) => void",
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
        type: { summary: "select" },
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
        "The value of the component. The DOM API casts this to a string.",
      table: {
        type: { summary: "any" },
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioWithAllColors: Story = {
  args: {
    checked: false,
    checkedIcon: undefined,
    className: "",
    color: "primary",
    disabled: false,
    icon: undefined,
    id: undefined,
    name: "",
    onChange: () => {},
    required: false,
    size: "medium",
    slotProps: {
      root: {
        ["data-custom" as string]: "true",
      },
      input: {
        style: { cursor: "pointer" },
        title: "custom-slotProps-input-title",
      },
    },
    slots: {
      root: "label",
      input: "input",
    },
    defaultChecked: false,
    sx: undefined,
    value: undefined,
  },

  render: function Render(args) {
    const [selectedOption, setSelectedOption] = useState<string>("primary");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSelectedOption(newValue);
      args.onChange?.(e);
    };

    const colors: RadioColor[] = [
      "primary",
      "secondary",
      "success",
      "error",
      "info",
      "warning",
      "muted",
    ];

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <Radio
                slotProps={args.slotProps}
                {...args}
                className={args.className}
                id={args.id}
                checkedIcon={args.checkedIcon}
                name="color-radio-group"
                value={color}
                disabled={args.disabled}
                checked={args.checked || selectedOption === color}
                onChange={handleChange}
                color={color}
              />
              <label htmlFor={args.id} className="capitalize">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const StandaloneRadioButtons: Story = {
  args: {
    checked: false,
    checkedIcon: undefined,
    className: "",
    color: "primary",
    disabled: false,
    icon: undefined,
    id: undefined,
    name: "cars",
    onChange: () => {},
    required: false,
    size: "medium",
    slotProps: {
      root: {
        ["data-custom" as string]: "true",
      },
      input: {
        style: { cursor: "pointer" },
        title: "custom-slotProps-input-title",
      },
    },
    slots: {
      root: "label",
      input: "input",
    },
    defaultChecked: true,
    sx: undefined,
    value: undefined,
  },

  render: function Render(args) {
    return (
      <div className="flex items-center gap-3">
        <Radio
          disabled={args.disabled}
          required={args.required}
          size={args.size}
          slot={args.slot}
          slotProps={args.slotProps}
          defaultChecked={args.defaultChecked}
          name={args.name}
          color={args.color}
          value={"bmw"}
        />
        <span>BMW</span>
        <Radio
          disabled={args.disabled}
          required={args.required}
          size={args.size}
          slot={args.slot}
          slotProps={args.slotProps}
          name={args.name}
          color={args.color}
          value={"mg"}
        />
        <span>Mg</span>
        <Radio
          disabled={args.disabled}
          required={args.required}
          size={args.size}
          slot={args.slot}
          slotProps={args.slotProps}
          name={args.name}
          color={args.color}
          value={"kia"}
        />
        <span>Kia</span>
      </div>
    );
  },
};
