import { cva } from "class-variance-authority";

export const accordionVariantsConfig = {
  variants: {
    disabled: { true: "cursor-none opacity-50 bg-gray-200" },
    disableGutters: {
      true: "mb-0",
    },
    square: { true: "rounded" },
    defaultExpanded: { true: "expanded" },
    expanded: { true: "expanded" },
    defaultVariants: {
      defaultExpanded: false,
      expanded: false,
      disabled: false,
      disableGutters: false,
    },
  },
};
export const accordionVariants = cva(`bg-white text-black shadow `, {
  variants: accordionVariantsConfig.variants,
  defaultVariants: {
    disabled: false,
    defaultExpanded: false,
    disableGutters: false,
    square: false,
    expanded: false,
  },
});
