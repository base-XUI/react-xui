import { cva } from "class-variance-authority";

export const accordionVariantsConfig = {
  variants: {
    disabled: { true: "cursor-not-allowed opacity-50 bg-gray-200" },
    disableGutters: {
      true: "p-0",
    },
        square: { true: "rounded" },   
    defaultVariants: {
      defaultExpanded: false,
      expand: false,
      disabled: false,
      disableGutters: false,
    },
  },
};
export const accordionVariants = cva(`transition-margin relative overflow-auto rounded-tl-[4px] rounded-tr-[4px] bg-white text-black shadow duration-150 ease-in-out }`, {
  variants: accordionVariantsConfig.variants,
  defaultVariants: {
    disabled: false,
    disableGutters: false,
    square: false,
  },
});
