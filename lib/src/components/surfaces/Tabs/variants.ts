import { cva } from "class-variance-authority";

// Tab Component Variants
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

// TabList Component Variants
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

// TabPanel Component Variants
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

// Tabs Component Variants
export const TABS_VARIANTS = {
  standard: "flex relative",
  scrollable: "flex relative overflow-x-auto scrollbar-thin",
  fullWidth: "flex relative w-full",
} as const;

export const TABS_ORIENTATIONS = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;

export const TABS_COLORS = {
  primary: "text-primary",
  secondary: "text-secondary",
  inherit: "text-inherit",
} as const;

export const tabsVariants = cva("", {
  variants: {
    variant: TABS_VARIANTS,
    orientation: TABS_ORIENTATIONS,
    textColor: TABS_COLORS,
  },
  defaultVariants: {
    variant: "standard",
    orientation: "horizontal",
    textColor: "inherit",
  },
});
