import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Snackbar } from "./Snackbar";
import { Button } from "@/components/inputs/Button";
import {
  SnackbarProps,
  SnackbarVerticalPosition,
  SnackbarHorizontalPosition,
} from "./Snackbar.types";
import { Typography } from "@/components/system-design/Typography";

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

    open: {
      control: "boolean",
      description: "Whether the snackbar is open",
    },
    sx: {
      control: "object",
      description: "The sx prop allows you to override the default styles",
    },
    onClose: {
      description:
        "onClose callback fired when the component requests to be closed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SnackbarWrapper>;

export const Default: Story = {
  args: {
    message: "This is a default snackbar",
  },
};

// Create a proper component for WithAction story
const WithActionComponent = (args: SnackbarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
      <Snackbar
        open={open}
        message={args.message}
        action={
          <div>
            <Button
              variant={"outlined"}
              onClick={() => setOpen(false)}
              size="small"
            >
              Undo
            </Button>
          </div>
        }
        autoHideDuration={args.autoHideDuration}
        anchorOrigin={args.anchorOrigin}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const WithAction: Story = {
  args: {
    message: "This is a snackbar with an action",
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    autoHideDuration: 5000,
  },
  render: (args) => <WithActionComponent {...args} />,
};

// Create a proper component for Positions story
const PositionsComponent = (args: SnackbarProps) => {
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState<SnackbarVerticalPosition>("top");
  const [horizontal, setHorizontal] =
    useState<SnackbarHorizontalPosition>("right");

  return (
    <div>
      <div className="w-[500px]">
        <div className="mb-8 flex justify-center">
          <Button
            variant="contained"
            onClick={() => {
              setVertical("top");
              setHorizontal("center");
              setOpen(true);
            }}
          >
            TOP-CENTER
          </Button>
        </div>
        <div className="mb-8 flex justify-between">
          <Button
            variant="contained"
            onClick={() => {
              setVertical("top");
              setHorizontal("left");
              setOpen(true);
            }}
          >
            TOP-LEFT
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setVertical("top");
              setHorizontal("right");
              setOpen(true);
            }}
          >
            TOP-RIGHT
          </Button>
        </div>
        <div className="mb-8 flex justify-between">
          <Button
            variant="contained"
            onClick={() => {
              setVertical("bottom");
              setHorizontal("left");
              setOpen(true);
            }}
          >
            BOTTOM-LEFT
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setVertical("bottom");
              setHorizontal("right");
              setOpen(true);
            }}
          >
            BOTTOM-RIGHT
          </Button>
        </div>
        <div className="mb-8 flex justify-center">
          <Button
            variant="contained"
            onClick={() => {
              setVertical("bottom");
              setHorizontal("center");
              setOpen(true);
            }}
          >
            BOTTOM-CENTER
          </Button>
        </div>
      </div>
      <Snackbar
        open={open}
        message={args.message}
        action={
          <div>
            <Button
              variant={"outlined"}
              onClick={() => setOpen(false)}
              size="small"
            >
              Undo
            </Button>
          </div>
        }
        autoHideDuration={args.autoHideDuration}
        anchorOrigin={{ vertical, horizontal }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Positions: Story = {
  args: {
    message: "This is a top-right positioned snackbar",
    anchorOrigin: { vertical: "top", horizontal: "right" },
    autoHideDuration: 5000,
  },
  render: (args) => <PositionsComponent {...args} />,
};

export const WithCustomContent: Story = {
  args: {
    action: <Button size={"small"}>Undo</Button>,
    children: (
      <div className="flex flex-col">
        <Typography variant={"subtitle2"}>Event has been created</Typography>
        <Typography variant={"caption"} color={"muted-foreground"}>
          Sunday, December 03, 2023 at 9:00 AM
        </Typography>
      </div>
    ),
  },
};
