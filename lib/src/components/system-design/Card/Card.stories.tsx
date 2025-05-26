import type { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./Card";
import { Button } from "@/components/inputs/Button";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional custom className",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <h3>Basic Card Content</h3>
        <p>This is a simple card with basic content</p>
      </CardContent>
    </Card>
  ),
};

export const ComplexExample: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <Button variant="outlined">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content section with multiple elements.</p>
        <ul className="list-disc pl-4">
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">Footer content</p>
      </CardFooter>
    </Card>
  ),
};

export const WithBorderPrimary: Story = {
  render: () => (
    <Card className="border-primary border-t-4">
      <CardHeader>
        <CardTitle>Primary Border Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card with a top primary border</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooterAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card with basic content</p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button>Footer Action</Button>
        </CardAction>
      </CardFooter>
    </Card>
  ),
};

export const AllSubcomponents: Story = {
  render: () => (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>All Components Demo</CardTitle>
        <CardDescription>Showing all card subcomponents</CardDescription>
        <CardAction>
          <Button>Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Main content area</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm">Footer section</p>
      </CardFooter>
    </Card>
  ),
};
