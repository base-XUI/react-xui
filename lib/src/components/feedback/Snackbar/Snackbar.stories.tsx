import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Snackbar } from "./Snackbar";
import { Button } from "@/components/inputs/Button";
import { SnackbarProps } from "./Snackbar.types";

const SnackbarWrapper = (props: SnackbarProps) => {
  const { open = false, ...snackbarProps } = props;
  const [initialOpen, setInitialOpen] = useState(open);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => setInitialOpen(true)}
        variant="contained"
        color="primary"
      >
        Open Snackbar
      </Button>
      <Snackbar
        {...snackbarProps}
        open={initialOpen}
        onClose={() => setInitialOpen(false)}
      />
    </div>
  );
};

const meta: Meta<typeof SnackbarWrapper> = {
  title: "Feedback/Snackbar",
  component: SnackbarWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {

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
type Story = StoryObj<typeof SnackbarWrapper>;

export const Default: Story = {
  args: {
    message: "This is a default snackbar",
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    autoHideDuration: 5000,
    withCloseIcon: true,
  },
};


export const WithAction: Story = {
  args: {
    message: "This is a snackbar with an action",
    action: <Button size="small">Undo</Button>,
  },
};

export const TopRight: Story = {
  args: {
    message: "This is a top-right positioned snackbar",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
};

export const WithoutCloseIcon: Story = {
  args: {
    message: "This snackbar has no close icon",
    withCloseIcon: false,
  },
};

export const WithCustomContent: Story = {
  args: {
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
