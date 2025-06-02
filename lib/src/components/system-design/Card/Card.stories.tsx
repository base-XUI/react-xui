import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";
import { CardAction } from "./CardAction";
import { CardFooter } from "./CardFooter";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible, reusable card component with polymorphic support and composable sub-components.",
      },
    },
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    component: {
      control: { type: "select" },
      options: ["div", "article", "section", "aside"],
      description: "The HTML element or React component to render",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          This is a basic card with default styling and no additional props.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithAllSections: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardAction>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Edit
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates all available sections working together.</p>
        <p className="mt-2 text-sm text-gray-600">
          Header with title and action, content area, and footer with buttons.
        </p>
      </CardContent>
      <CardFooter>
        <button className="mr-2 rounded bg-blue-600 px-4 py-2 text-white">
          Save
        </button>
        <button className="rounded border border-gray-300 px-4 py-2">
          Cancel
        </button>
      </CardFooter>
    </Card>
  ),
};

export const AsSection: Story = {
  render: () => (
    <Card component="section" className="w-96">
      <CardHeader>
        <CardTitle>Section Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card is rendered as a &lt;section&gt; element.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Header Only Card</CardTitle>
      </CardHeader>
    </Card>
  ),
};

export const HeaderWithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardAction>
          <button className="text-sm text-red-600 hover:text-red-800">
            Delete
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>The header includes an action button positioned to the right.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderWithMultipleActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Multiple Actions</CardTitle>
        <CardAction>
          <div className="flex gap-2">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Edit
            </button>
            <button className="text-sm text-red-600 hover:text-red-800">
              Delete
            </button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Multiple actions can be grouped within the CardAction component.</p>
      </CardContent>
    </Card>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Rich Content Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>This card contains various types of content:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Text content</li>
            <li>Lists</li>
            <li>Images (placeholder)</li>
          </ul>
          <div className="flex h-32 items-center justify-center rounded bg-gray-100">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Card className="w-96 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="text-purple-800">Custom Styled Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-700">
          This card demonstrates custom styling with gradient background and
          purple theme.
        </p>
      </CardContent>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid w-[800px] grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((num) => (
        <Card key={num}>
          <CardHeader>
            <CardTitle>Card {num}</CardTitle>
            <CardAction>
              <button className="text-sm text-blue-600">View</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Content for card number {num}.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
