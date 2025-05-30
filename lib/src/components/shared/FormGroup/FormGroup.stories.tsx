import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Source, Subtitle, Title } from "@storybook/blocks";
import { useArgs } from "storybook/internal/preview-api";
import { FormGroup } from "./FormGroup";
import { Checkbox } from "@/components/Checkbox";
import { Link } from "storybook/internal/components";
import { Check } from "lucide-react";

const meta: Meta<typeof FormGroup> = {
  title: "shared/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
            <p className="text-gray-600">
              The <code>FormGroup</code> component is used to wrap multiple form
              controls such as checkboxes or switches. It provides a consistent
              layout and supports both vertical and horizontal alignment.
            </p>
          </section>

          <Canvas />
          <Controls />
          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold">Accessibility</h2>
            <ul className="list-disc space-y-1 pl-5 text-gray-700">
              <li>
                Labels are correctly associated with inputs using htmlFor.
              </li>
              <li>Supports keyboard navigation out of the box.</li>
              <li>ARIA roles are properly applied for screen readers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold">Source Files</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>FormGroup.tsx</li>
              <li>FormGroup.types.ts</li>
              <li>FormGroup.stories.tsx</li>
              <li>FormGroup.cy.tsx</li>
            </ul>
          </section>
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
        defaultValue: { summary: "-" },
      },
    },
  },
  args: {
    children: null,
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
    children: null,
    row: false,
    sx: {},
  },
  render: function Render(args) {
    const [currentArgs, updateArgs] = useArgs();

    // 🟡 القيم الافتراضية هنا بدل وضعها في args
    const defaultCheckedItems = {
      Apple: false,
      Banana: false,
      Cherry: false,
    };

    const checkedItems = currentArgs.checkedItems || defaultCheckedItems;

    const options = [
      { id: "opt1", label: "Apple" },
      { id: "opt2", label: "Banana" },
      { id: "opt3", label: "Cherry" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      const newCheckedItems = {
        ...checkedItems,
        [name]: checked,
      };
      updateArgs({ checkedItems: newCheckedItems });
    };

    // Pass checked values via args
    return (
      <FormGroup
        animation={args.animation}
        sx={args.sx}
        className={args.className}
        row={args.row}
      >
        {options.map(({ label }) => (
          <div key={label} className="flex gap-2">
            <Checkbox
              name={label}
              checked={checkedItems[label]}
              onChange={handleChange}
            />
            {label}
          </div>
        ))}
      </FormGroup>
    );
  },
};
