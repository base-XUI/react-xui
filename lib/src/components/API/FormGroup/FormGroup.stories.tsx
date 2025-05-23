import { ChangeEvent, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormGroup } from "./FormGroup";
import { Checkbox } from "../../Checkbox";
import { FormControlLabel } from "../FormControlLabel";
import { Canvas, Controls, Source, Subtitle, Title } from "@storybook/blocks";
import { Link } from "storybook/internal/components";
import { CodeXml, Rocket, Settings } from "lucide-react";

const meta: Meta<typeof FormGroup> = {
  title: "Inputs/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            <p className="text-[1rem]">
              API reference docs for the React FormGroup component. Learn about
              the props, CSS, and other APIs of this exported module
            </p>
          </Subtitle>
          <Canvas />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    row: {
      control: { type: "boolean" },
      description: "Display group of elements in a compact row.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    animation: {
      control: { type: "boolean" },
      description:
        "If true, applies transition animations to the form group elements",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Custom class names for styling.",
      table: {
        type: { summary: "string" },
      },
    },
    sx: {
      control: {
        type: "object", // Ensure it's treated as an object
        defaultValue: { background: "red" }, // Default value
      },
      description: "Inline styles for customization.",
      table: {
        type: { summary: "CSSProperties" },
      },
    },
    children: {
      control: { disable: true },
      description: "The content of the component.",
      table: {
        type: {
          summary: "ReactElement",
          detail: "Accepts React element",
        },
        defaultValue: { summary: "<Check />" },
      },
    },
  },
  args: {
    children: (
      <>
        <FormControlLabel control={<Checkbox />} label="Option 1" />
        <FormControlLabel control={<Checkbox />} label="Option 2" />
      </>
    ),
    row: false,
    sx: {},
    animation: false,
    className: "",
  },
} satisfies Meta<typeof FormGroup>;
type FormGroupStory = StoryObj<typeof FormGroup>;

export default meta;

export const Default: FormGroupStory = {
  args: {
    row: false,
    sx: {},
  },
  render: (args) => {
    const options = [
      { id: "opt1", label: "Apple" },
      { id: "opt2", label: "Banana" },
      { id: "opt3", label: "Cherry" },
    ];

    const [values, setValues] = useState<Record<string, boolean>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: checked,
      }));
    };
    return (
      <FormGroup animation={args.animation} row={args.row} sx={args.sx}>
        {options?.map(({ id, label }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                name={label}
                checked={values[label]}
                onChange={handleChange}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    );
  },
};
