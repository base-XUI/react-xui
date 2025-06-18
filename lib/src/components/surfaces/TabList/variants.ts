import { cva } from "class-variance-authority";

export const TABLIST_VARIANTS = {
  standard: "border-b border-gray-200",
  contained: "border-none",
  borderless: "border-none",
} as const;

export const TABLIST_ORIENTATIONS = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;

export const TABLIST_SIZES = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
} as const;

export const tabListVariants = cva("flex", {
  variants: {
    variant: TABLIST_VARIANTS,
    orientation: TABLIST_ORIENTATIONS,
    size: TABLIST_SIZES,
  },
  defaultVariants: {
    variant: "standard",
    orientation: "horizontal",
    size: "md",
  },
});
