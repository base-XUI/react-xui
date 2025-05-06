import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import { linkVariantsConfig } from "./variants";

// Extract variant options directly from the config
const variantOptions = Object.keys(linkVariantsConfig.variants.variant);
//color options
const colorOptions = Object.keys(linkVariantsConfig.variants.color);
//text decoration options as array
const underlineOption = Object.keys(
  linkVariantsConfig.variants.underline,
) as [];

const meta = {
  title: "Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Link component is used to create hyperlinks. It can be styled using the theme typography styles and supports different color schemes. The component can also be rendered as a different element type, such as a button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "Color scheme of the Link",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: linkVariantsConfig.defaultVariants.color },
      },
    },
    variant: {
      description:
        "Applies the theme typography styles {h1, h2, h3, h4, h5, h6,...etc}",
      options: variantOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: linkVariantsConfig.defaultVariants.variant },
      },
    },

    underline: {
      description:
        "Controls when the link should have an underline.It can be set to 'always', 'hover', or 'none'.",
      // description: "Controls when the link should have an underline.",
      options: underlineOption,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "always" },
      },
    },
    as: {
      description: "The component used for the root node",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "link" },
      },
    },
    // target: {
    //   description: "Specifies where to open the linked document",
    //   options: ["_self", "_blank"],
    //   control: { type: "select" },
    //   table: {
    //     defaultValue: { summary: "_self" },
    //   },
    // },

    // rel: {
    //   description:
    //     "Specifies the relationship between the current document and the linked document. Common values include noreferrer (prevents the browser from sending the HTTP referer header) and noopener (prevents the new page from accessing the window.opener property).",
    //   options: ["noopener", "noreferrer"],
    //   control: { type: "select" },
    // },
    component: {
      description:
        "The component used for the root node. Either a string to use a HTML element or a component.",
      control: { type: "text" },
      // table: {
      //   defaultValue: { summary: "a" },
      // },
    },
  },
  args: {
    href: "#",
    children: "Link",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;
// Basic variants
export const Basic: Story = {
  args: {
    href: "#",
  },
};
// Basic variants
export const underline: Story = {
  args: {
    underline: "none",
  },

  render: () => (
    <div className="inline-flex w-[400px] flex-col gap-4">
      {underlineOption.map((underline) => (
        <Link key={underline} underline={underline}>
          underline-{underline}
        </Link>
      ))}
    </div>
  ),
};

export const security: Story = {
  args: {
    href: "#",
    target: "_blank",
    rel: "noreferrer",
  },
};
// Example of using as a different element
export const AsButton: StoryObj<typeof Link> = {
  args: {
    component: "button",
    children: "Link Button",
    onClick: () => console.log("Button clicked!"),
  },
};
