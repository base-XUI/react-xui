import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { Typography } from "@/components/system-design/Typography";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "The type of content that will be rendered.",
      options: ["text", "circular", "rectangular", "rounded"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "text" },
      },
    },
    animation: {
      description: "The animation. If false the animation effect is disabled.",
      options: ["pulse", "wave", false],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "pulse" },
      },
    },
    width: {
      description:
        "Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.",
      control: { type: "text" },
    },
    height: {
      description:
        "Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card.",
      control: { type: "text" },
    },
    component: {
      description:
        "The component used for the root node. Either a string to use a HTML element or a component.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "span" },
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Variants story
export const Variants: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Skeleton variant="text" width={210} style={{ fontSize: "1rem" }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </div>
  ),
};
export const Animation: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Skeleton variant="text" style={{ fontSize: "1rem" }} />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation={false} style={{ fontSize: "1rem" }} />
    </div>
  ),
};

// Animations story - Pulsate example
export const PulsateExample: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <p className="mb-2 text-sm">Default animation (pulse)</p>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />

      {/* Example similar to the YouTube-like UI shown in the requirements */}
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" className="mt-2" />
            <Skeleton variant="text" width="60%" className="mt-1" />
          </div>
          <div>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" className="mt-2" />
            <Skeleton variant="text" width="60%" className="mt-1" />
          </div>
          <div>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" className="mt-2" />
            <Skeleton variant="text" width="60%" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Animations story - Wave example
export const WaveExample: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <p className="mb-2 text-sm">Wave animation</p>
      <Skeleton animation="wave" variant="text" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={210}
        height={118}
      />

      {/* Example similar to the card UI shown in the requirements */}
      <div className="mx-auto mt-8 w-[300px]">
        <div className="rounded-md border p-4">
          <div className="flex items-center gap-2">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <div className="flex-1">
              <Skeleton animation="wave" variant="text" width="80%" />
              <Skeleton animation="wave" variant="text" width="40%" />
            </div>
            <Skeleton animation="wave" variant="text" width={20} />
          </div>
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={200}
            className="mt-4"
          />
          <Skeleton animation="wave" variant="text" className="mt-4" />
          <Skeleton animation="wave" variant="text" width="80%" />
        </div>
      </div>
    </div>
  ),
};

// Inferring dimensions story
export const InferringDimensions: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-6">
      <div>
        <p className="mb-2 text-sm">
          Typography with skeleton (inferring height from em units)
        </p>
        <Typography variant="h1">
          <Skeleton />
        </Typography>
        <Typography variant="h3">
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
      </div>

      <div>
        <p className="mb-2 text-sm">Inferring dimensions from children</p>
        <div className="flex items-center gap-4">
          <Skeleton variant="circular">
            <div className="h-16 w-16 rounded-full" />
          </Skeleton>

          <Skeleton variant="rectangular">
            <div className="h-12 w-32" />
          </Skeleton>
        </div>
      </div>
    </div>
  ),
};

// Color story
export const Colors: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <p className="mb-2 text-sm">Default color</p>
      <Skeleton variant="rectangular" width={210} height={60} />

      <p className="mb-2 text-sm">Custom color (light grey)</p>
      <Skeleton
        variant="rectangular"
        width={210}
        height={60}
        className="bg-gray-300"
      />

      <p className="mb-2 text-sm">Custom color (dark grey)</p>
      <Skeleton
        variant="rectangular"
        width={210}
        height={60}
        className="bg-gray-500"
      />

      <p className="mb-2 text-sm">Custom color (on dark background)</p>
      <div className="bg-gray-900 p-4">
        <Skeleton
          variant="rectangular"
          width={210}
          height={60}
          className="bg-gray-800"
        />
      </div>
    </div>
  ),
};

// No animation example
export const NoAnimation: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <p className="mb-2 text-sm">Animation disabled</p>
      <Skeleton animation={false} variant="text" />
      <Skeleton
        animation={false}
        variant="rectangular"
        width={210}
        height={60}
      />
      <Skeleton animation={false} variant="rounded" width={210} height={60} />
    </div>
  ),
};
