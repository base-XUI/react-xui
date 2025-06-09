import { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";
import { useArgs } from "storybook/internal/preview-api";
import { FormControlLabel } from "../API/FormControlLabel";
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
        type: { summary: null as any },
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
    defaultValue: "angular",
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
        row={args.row}
        value={value}
        defaultValue={args.defaultValue}
        name={args.name}
        id={args.id}
        onChange={handleChange}
      >
        <FormControlLabel label="Angular" control={<Radio value="angular" />} />
        <FormControlLabel label="React" control={<Radio value="react" />} />
        <FormControlLabel label="Vue" control={<Radio value="vue" />} />
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
        onValueChange={(directValue) => {
          console.log(directValue);
        }}
      >
        <FormControlLabel label="Male" control={<Radio value="male" />} />
        <FormControlLabel label="Female" control={<Radio value="female" />} />
      </RadioGroup>
    );
  },
};
export const RadioWithoutRadioGroup: Story = {
  render: () => {
    return (
      <>
        <FormControlLabel
          label="options11"
          value="1"
          control={<Radio name="options11" />}
        />
        <FormControlLabel
          label="options21"
          control={<Radio name="options11" value="2" />}
        />
        <FormControlLabel
          label="options31"
          control={<Radio name="options31" value="3" />}
        />
      </>
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
        <FormControlLabel
          value="female"
          aria-atomic="false"
          control={<Radio />}
          label="Female"
        />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
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
            <FormControlLabel
              key={idx}
              control={
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
              }
              label={`${num.label} `}
            />
          ))}
        </RadioGroup>
      </div>
    );
  },
};
