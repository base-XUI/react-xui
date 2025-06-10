import { cva } from "class-variance-authority";

export const TABPANEL_VARIANTS = {
  standard: "p-4",
  boxed: "p-4 border rounded-lg",
  borderless: "p-4 border-0",
} as const;

export const TABPANEL_ANIMATIONS = {
  fade: "transition-opacity duration-200",
  slide: "transition-transform duration-200",
  none: "",
} as const;

export const tabPanelVariants = cva("focus:outline-none", {
  variants: {
    variant: TABPANEL_VARIANTS,
    animation: TABPANEL_ANIMATIONS,
  },
  defaultVariants: {
    variant: "standard",
    animation: "fade",
  },
});
