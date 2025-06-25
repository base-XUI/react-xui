import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle } from "./Alert";
import { alertVariantsConfig } from "./variants";
import { Button } from "@/components/inputs/Button";
import { Popcorn } from "lucide-react";

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
export const Actions: Story = {
  render: () => {
    return (
      <div className="flex w-[500px] flex-col gap-4">
        <Alert severity="warning" onClose={() => {}}>
          This Alert displays the default close icon.
        </Alert>
        <Alert
          severity="success"
          action={
            <Button variant="text" size="small" color="inherit">
              UNDO
            </Button>
          }
        >
          This Alert uses a Button component for its action.
        </Alert>
      </div>
    );
  },
};

// Icons stories
export const Icons: Story = {
  render: () => (
    <div className="flex w-[600px] flex-col gap-4">
      <Alert severity="success" icon={"😎"}>
        This success Alert has a custom icon
      </Alert>
      <Alert severity="success" icon={false}>
        This success Alert has no icon.
      </Alert>
      <Alert
        iconMapping={{
          success: "🤖",
          error: "👹",
        }}
      >
        This success Alert uses `iconMapping` to override the default icon.
      </Alert>
    </div>
  ),
};

// Title stories
export const Titles: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
      <Alert severity="info" onClose={() => {}}>
        <AlertTitle>Info</AlertTitle>
        This is an info Alert with an informative title.
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert with a cautious title.
      </Alert>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>
    </div>
  ),
};
export const ShadeCNLike: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert severity="success" variant="outlined">
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        This is an alert with icon, title and description.
      </Alert>
      <Alert
        severity="success"
        variant="outlined"
        icon={<Popcorn className="h-[20px] w-[20px]" />}
      >
        <AlertTitle>
          This Alert has a title and an icon. No description.
        </AlertTitle>
      </Alert>

      <Alert severity="error" variant="outlined">
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <p>Please verify your billing information and try again.</p>
        <ul className="mt-1 list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </Alert>
    </div>
  ),
};
