import { useState } from "react";
import { Snackbar } from "./Snackbar";
import type { SnackbarOrigin } from "./Snackbar.types";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Snackbar> = {
  title: "Feedback/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "If true, the snackbar is open/visible",
      defaultValue: false,
    },
    message: {
      control: "text",
      description: "The message to display in the snackbar",
    },
    autoHideDuration: {
      control: { type: "number", min: 0, step: 1000 },
      description:
        "The number of milliseconds to wait before automatically closing",
      defaultValue: 4000,
    },
    anchorOrigin: {
      control: "object",
      description: "The position where the snackbar should appear",
    },
    action: {
      description: "The action to display, typically a button",
    },
    className: {
      control: "text",
      description: "CSS class name to apply to the snackbar",
    },
    onClose: {
      description: "Callback fired when the snackbar is closed",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Show Snackbar</button>
        <Snackbar
          open={open}
          message="This is a basic snackbar"
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  args: {
    open: true,
    message: "This is a customizable snackbar",
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls panel to customize this snackbar in real-time.",
      },
    },
  },
};

export const WithAutoHide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Show Auto-hiding Snackbar</button>
        <Snackbar
          open={open}
          message="This will auto-hide after 3 seconds"
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Show Snackbar</button>
        <Snackbar
          open={open}
          message="Snackbar with action"
          action={<button onClick={() => setOpen(false)}>UNDO</button>}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const Positioned: Story = {
  args: {
    open: true,
    message: "This is a customizable snackbar",
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates how to position the snackbar in different corners of the screen.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>({
      vertical: "top",
      horizontal: "right",
    });
    return (
      <div>
        <select
          value={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
          onChange={(e) => {
            const [vertical, horizontal] = e.target.value.split("-");
            setAnchorOrigin({
              vertical: vertical as SnackbarOrigin["vertical"],
              horizontal: horizontal as SnackbarOrigin["horizontal"],
            });
          }}
        >
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
        <Snackbar
          open={open}
          message={`Snackbar at ${anchorOrigin.vertical} ${anchorOrigin.horizontal}`}
          anchorOrigin={anchorOrigin}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: {
    open: true,
    message: "Custom styled snackbar",
    className: "bg-blue-600 text-white rounded-xl",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of applying custom styling to the snackbar.",
      },
    },
  },
};
