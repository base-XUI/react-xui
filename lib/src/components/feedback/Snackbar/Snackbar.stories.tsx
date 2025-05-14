import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";
import { Button } from "@/components/inputs/Button";

const meta: Meta<typeof Snackbar> = {
  title: "Feedback/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: "select",
      options: ["primary", "secondary", "warning", "error", "info", "success"],
      description: "The severity of the snackbar",
    },
    variant: {
      control: "radio",
      options: ["filled", "outlined"],
      description: "The variant of the snackbar",
    },
    transition: {
      control: "select",
      options: ["fade", "slide", "grow"],
      description: "The transition effect",
    },
    anchorOrigin: {
      control: "object",
      description: "The position of the snackbar",
    },
    autoHideDuration: {
      control: "number",
      description: "The duration in milliseconds to auto-hide the snackbar",
    },
    withCloseIcon: {
      control: "boolean",
      description: "Whether to show the close icon",
    },
    open: {
      control: "boolean",
      description: "Whether the snackbar is open",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    message: "This is a default snackbar",
    open: true,
    severity: "primary",
    variant: "filled",
    transition: "fade",
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    autoHideDuration: 5000,
    withCloseIcon: true,
  },
};

export const WithAction: Story = {
  args: {
    message: "This is a snackbar with an action",
    open: true,
    severity: "info",
    variant: "filled",
    action: <Button size="small">Undo</Button>,
  },
};

export const Success: Story = {
  args: {
    message: "This is a success snackbar",
    open: true,
    severity: "success",
    variant: "filled",
  },
};

export const Error: Story = {
  args: {
    message: "This is an error snackbar",
    open: true,
    severity: "error",
    variant: "filled",
  },
};

export const Warning: Story = {
  args: {
    message: "This is a warning snackbar",
    open: true,
    severity: "warning",
    variant: "filled",
  },
};

export const Info: Story = {
  args: {
    message: "This is an info snackbar",
    open: true,
    severity: "info",
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    message: "This is an outlined snackbar",
    open: true,
    severity: "success",
    variant: "outlined",
  },
};

export const TopRight: Story = {
  args: {
    message: "This is a top-right positioned snackbar",
    open: true,
    severity: "info",
    variant: "filled",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
};

export const WithoutCloseIcon: Story = {
  args: {
    message: "This snackbar has no close icon",
    open: true,
    severity: "warning",
    variant: "filled",
    withCloseIcon: false,
  },
};

export const WithCustomContent: Story = {
  args: {
    open: true,
    severity: "primary",
    variant: "filled",
    children: (
      <div className="flex flex-col">
        <span className="font-bold">Custom Content</span>
        <span className="text-sm">
          This snackbar has custom content instead of a message
        </span>
      </div>
    ),
  },
};
