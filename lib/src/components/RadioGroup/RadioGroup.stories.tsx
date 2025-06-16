import { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";
import { useArgs } from "storybook/internal/preview-api";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "../API/Radio";
import { Star } from "lucide-react";

const meta = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "RadioGroup is a helpful wrapper used to group Radio components that provides an easier API, and proper keyboard accessibility to the group.",
      },
      page: () => {
        return (
          <>
            <Title>RadioGroup</Title>
            <Subtitle
              children={
                <span className="text-[1rem]">
                  RadioGroup is a helpful wrapper used to group Radio components
                  that provides an easier API, and proper keyboard accessibility
                  to the group.
                </span>
              }
            />
            <Canvas />
            <Controls />
          </>
        );
      },
    },
  },
  argTypes: {
    children: {
      control: { disable: true },
      table: {
        type: { summary: "node" },
      },
      description: "The children of the RadioGroup",
    },
    defaultValue: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "string" },
        type: { summary: "string" },
      },
      description:
        "The default value. Use when the component is not controlled.",
    },
    name: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "string" },
      },
      description:
        "The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name.",
    },
    onChange: {
      control: { disable: true },
      table: {
        defaultValue: { summary: "func" },
      },
      description: ` Callback fired when a radio button is selected.<br/><br/><code> Signature: </code>

<code>function(event: ChangeEvent, value: string, metaData: Object) => void </code><br/><br/>
• <strong> event </strong> <code> The event source of the callback.</code> <br/><br/>
• <strong> value </strong> <code> Selected value directly passed as a parameter.</code> <br/><br/>
• <strong> metaData </strong> <code> An object containing additional metadata .</code> <br/>
           `,
    },
    onValueChange: {
      control: { disable: true },
      table: {
        defaultValue: { summary: "func" },
        type: { summary: "func" },
      },
      description:
        "Simplified callback for uncontrolled components. Accepts the same parameters as `onChange`, but focuses on the raw value.",
    },
    value: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "string" },
        type: { summary: "string" },
      },
      description:
        "Value of the selected radio button. The DOM API casts this to a string.",
    },
    row: {
      control: { type: "boolean" },
      description: "Display radios in a horizontal layout",
    },

    sx: {
      control: {
        type: "object",
      },
      description: "Inline styles for customization.",
      table: {
        defaultValue: { summary: "object" },
        type: { summary: "CSSProperties" },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const RadioGroupControlled: Story = {
  args: {
    value: undefined,
    children: undefined,
    defaultValue: undefined,
    row: false,
    sx: undefined,
    id: undefined,
    name: "collection",
    onChange: undefined,
    onValueChange: undefined,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ value: e.target.value });
    };

    return (
      <RadioGroup
        sx={args.sx}
        defaultValue={args.defaultValue}
        row={args.row}
        name="frameworksGroup"
        value={value}
        onChange={handleChange}
      >
        <div className="my-1 flex items-center gap-4">
          <Radio defaultChecked value="angular" />
          <span>Angular</span>
        </div>
        <div className="my-1 flex items-center gap-4">
          <Radio value="react" />
          <span>React</span>
        </div>
        <div className="my-1 flex items-center gap-4">
          <Radio value="vue" />
          <span>Vue</span>
        </div>
      </RadioGroup>
    );
  },
};
export const RadioGroupUncontrolled: Story = {
  args: {
    value: undefined,
    children: undefined,
    defaultValue: "male",
    row: false,
    sx: undefined,
    id: undefined,
    name: "collection",
    onChange: undefined,
    onValueChange: undefined,
  },
  render: (args) => {
    return (
      <RadioGroup
        sx={args.sx}
        row={args.row}
        defaultValue={args.defaultValue}
        name={args.name}
        id={args.id}
      >
        <div className="my-2 flex items-center gap-3">
          <Radio value="male" />
          <span>Male</span>
        </div>
        <div className="my-2 flex items-center gap-3">
          <Radio value="female" />
          <span>Female</span>
        </div>
      </RadioGroup>
    );
  },
};
export const RadioWithoutRadioGroup: Story = {
  render: () => {
    return (
      <div className="flex flex-col justify-start gap-3">
        <span className="my-1 flex items-center gap-2">
          <Radio defaultChecked name="colors" value="Blue" color="primary" />
          <span>Blue</span>
        </span>
        <span className="my-1 flex items-center gap-2">
          <Radio name="colors" value="green" color="success" />
          <span>Green</span>
        </span>
        <span className="my-1 flex items-center gap-2">
          <Radio name="colors" value="purple" color="error" />
          <span>Red</span>
        </span>
      </div>
    );
  },
};
export const Direction: Story = {
  args: {
    row: true,
    defaultValue: "female",
    name: "collection",
    value: "female",
    onChange: undefined,
    onValueChange: undefined,
  },
  render: (args) => {
    return (
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        defaultValue={args.defaultValue}
        onChange={args.onChange}
        row={args.row}
      >
        <div className="my-2 flex items-center gap-3">
          <Radio value="male" />
          <span>Male</span>
        </div>
        <div className="my-2 flex items-center gap-3">
          <Radio value="female" />
          <span>Female</span>
        </div>
      </RadioGroup>
    );
  },
};
export const CustomRadioExample: Story = {
  args: {
    defaultValue: 1,
    name: "rating-example",
    row: false,
  },
  render: (args) => {
    const RateData = [
      { value: 1, label: "1 Star", name: "1 Star" },
      { value: 2, label: "2 Stars", name: "1 Star" },
      { value: 3, label: "3 Stars", name: "1 Star" },
      { value: 4, label: "4 Stars", name: "1 Star" },
      { value: 5, label: "5 Stars", name: "1 Star" },
    ];
    return (
      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Rate Your Experience (1 to 5)
        </h3>
        <RadioGroup
          defaultValue={args.defaultValue}
          name="groupRate"
          row={args.row}
          {...args}
          aria-label="Experience Rating"
        >
          {RateData.map((num, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Radio
                value={num.value}
                name={num.name}
                className="border-0 bg-transparent hover:bg-transparent focus:bg-transparent"
                icon={
                  <Star fill="#fff" strikethroughThickness={1} color="#DDD" />
                }
                checkedIcon={<Star fill="#ffd230" color="#ffd230" />}
                id={`rating-${num.label}`}
              />
              <span>{num.label}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  },
};
