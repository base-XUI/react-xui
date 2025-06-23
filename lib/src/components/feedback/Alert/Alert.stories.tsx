import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Alert, AlertTitle } from "./Alert";
import { alertVariantsConfig } from "./variants";
import { Button } from "@/components/inputs/Button";

// Extract variant options directly from the config
const variantOptions = Object.keys(alertVariantsConfig.variants.variant);
const severityOptions = Object.keys(alertVariantsConfig.variants.severity);
const colorOptions = Object.keys(alertVariantsConfig.variants.color);

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alerts give users brief and potentially time-sensitive information in an unobtrusive manner.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    severity: {
      description:
        "The severity of the alert. This defines the color and icon used.",
      options: severityOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: alertVariantsConfig.defaultVariants.severity },
      },
    },
    variant: {
      description: "The variant to use.",
      options: variantOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: alertVariantsConfig.defaultVariants.variant },
      },
    },
    color: {
      description: "Override the default color for the specified severity.",
      options: colorOptions,
      control: { type: "select" },
    },
    icon: {
      description: "Override the icon displayed before the children.",
      control: { type: "boolean" },
    },
    action: {
      description:
        "The action to display. It renders after the message, at the end of the alert.",
    },
    onClose: {
      description: "Callback fired when the component requests to be closed.",
    },
    role: {
      description: "The ARIA role attribute of the element.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "alert" },
      },
    },
    component: {
      description: "The component used for the root node.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "div" },
      },
    },
  },
  args: {
    children: "This is an alert message.",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

// Variant showcase
export const Severity: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {severityOptions.map((severity) => (
        <Alert key={severity} severity={severity as any}>
          This is an outlined {severity} Alert.
        </Alert>
      ))}
    </div>
  ),
};

export const FilledVariants: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {severityOptions.map((severity) => (
        <Alert key={severity} severity={severity as any} variant="filled">
          This is a filled {severity} Alert.
        </Alert>
      ))}
    </div>
  ),
};
export const OutlinesVariants: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {severityOptions.map((severity) => (
        <Alert key={severity} severity={severity as any} variant="outlined">
          This is a filled {severity} Alert.
        </Alert>
      ))}
    </div>
  ),
};

// Color override story
export const ColorOverride: Story = {
  args: {
    severity: "success",
    color: "warning",
    children: "This is a success Alert with warning colors.",
  },
};

// Actions stories
export const WithCloseButton: Story = {
  args: {
    severity: "warning",
    onClose: fn(),
    children: "This Alert displays the default close icon.",
  },
};

export const WithCustomAction: Story = {
  args: {
    severity: "success",
    action: (
      <Button variant="text" size="small" color="inherit">
        UNDO
      </Button>
    ),
    children: "This Alert uses a Button component for its action.",
  },
};

// Icons stories
export const NoIcon: Story = {
  args: {
    icon: false,
    children: "This Alert has no icon.",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: <span className="text-xl">🚀</span>,
    children: "This Alert has a custom icon.",
  },
};

// Title stories
export const WithTitle: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert severity="success" onClose={() => {}}>
        This is a success Alert with an encouraging title.
        <AlertTitle>Success</AlertTitle>
      </Alert>
      <Alert severity="info" onClose={() => {}}>
        <AlertTitle>Info</AlertTitle>
        This is an info Alert with an informative title.
      </Alert>
      <Alert severity="warning" action={<Button size={"small"}>undo</Button>}>
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert with a cautious title.
      </Alert>
      <Alert severity="error" action={<button>undo</button>}>
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>
    </div>
  ),
};

// Combined features
export const CombinedFeatures: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert
        severity="success"
        variant="filled"
        action={
          <Button variant="text" size="small" color="inherit">
            DISMISS
          </Button>
        }
      >
        <AlertTitle>Success</AlertTitle>
        This Alert combines multiple features: filled variant, title, and custom
        action.
      </Alert>
      <Alert severity="error" variant="outlined" onClose={fn()}>
        <AlertTitle>Error</AlertTitle>
        This Alert combines multiple features: outlined variant, title, and
        close button.
      </Alert>
    </div>
  ),
};
