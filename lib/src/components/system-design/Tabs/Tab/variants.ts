import { cva } from "class-variance-authority";

export const TAB_VARIANTS = {
  standard: "px-4 py-2 transition-all duration-200",
  fullWidth: "flex-1 px-4 py-2 transition-all duration-200",
} as const;

export const TAB_STATES = {
  active: "border-b-2",
  disabled: "opacity-50 cursor-not-allowed",
  default: "cursor-pointer hover:bg-gray-100",
} as const;

export const TAB_COLORS = {
  primary: "text-primary border-primary",
  secondary: "text-secondary border-secondary",
  inherit: "text-inherit border-current",
} as const;

export const tabVariants = cva(
  "flex items-center justify-center focus:outline-none",
  {
    variants: {
      variant: TAB_VARIANTS,
      state: TAB_STATES,
      color: TAB_COLORS,
    },
    defaultVariants: {
      variant: "standard",
      state: "default",
      color: "primary",
    },
  },
);
