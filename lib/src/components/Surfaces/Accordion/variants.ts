import { cva } from "class-variance-authority";
// Configuration object that we can export for use in stories
export const accordionVariantsConfig = {
  variants: {
    disabled: { true: "cursor-default opacity-50 bg-gray-200" },
    disableGutters: {
      true: "mb-0",
    },
    square: { true: "rounded-none" },
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
export const accordionVariants = cva(`bg-white text-black border-b-1 first:rounded-tl-[4px] last:rounded-bl-[4px] first:rounded-tr-[4px] last:rounded-br-[4px] border-b-gray-100`, {
  variants: accordionVariantsConfig.variants,
  defaultVariants: {
    disabled: false,
    defaultExpanded: false,
    disableGutters: false,
    square: false,
    expanded: false,
  },
});
