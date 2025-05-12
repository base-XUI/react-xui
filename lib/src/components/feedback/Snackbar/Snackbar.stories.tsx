import { ComponentProps, useState } from "react";
import { Snackbar } from "./Snackbar";
import type { SnackbarOrigin } from "./Snackbar.types";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/inputs/Button";

type StoryProps = ComponentProps<typeof Snackbar>;

const meta: Meta<StoryProps> = {
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

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    message: "Snackbar message",
    open: true,
    anchorOrigin: {
      vertical: "top", // top || bottom
      horizontal: "center", // left || right || center
    },
  },
  render: (args) => {
    return <Snackbar {...args} />;
  },
};
export const WithChildren: Story = {
  args: {
    open: true,
    anchorOrigin: {
      vertical: "top", // top || bottom
      horizontal: "center", // left || right || center
    },
    children: "Hello World",
  },
  render: (args) => {
    return <Snackbar {...args} />;
  },
};

const WithAutoHideComponent = () => {
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
};

export const WithAutoHide: Story = {
  render: () => <WithAutoHideComponent />,
};

// Repeat this pattern for WithAction and Positioned stories:
const WithActionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Snackbar
        open={open}
        message="Snackbar with action"
        action={
          <Button variant={"outlined"} onClick={() => setOpen(false)}>
            Close
          </Button>
        }
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const WithAction: Story = {
  render: () => <WithActionComponent />,
};

const PositionedComponent = (args: StoryProps) => {
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
        message={`Snackbar at ${anchorOrigin.vertical} ${anchorOrigin.horizontal}`}
        anchorOrigin={anchorOrigin}
        {...args}
      />
    </div>
  );
};

export const Positioned: Story = {
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates how to position the snackbar in different corners of the screen.",
      },
    },
  },
  render: (args) => <PositionedComponent {...args} />,
};

export const WithCustomStyle: Story = {
  args: {
    open: true,
    anchorOrigin: {
      vertical: "top", // top || bottom
      horizontal: "center", // left || right || center
    },
    message: "Custom style snackbar",
    style: { background: "black", color: "white" },
  },
  render: (args) => {
    return <Snackbar {...args} />;
  },
};
