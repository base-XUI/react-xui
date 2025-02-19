import { cva } from "class-variance-authority";

export const buttonVariantsConfig = {
  variants: {
    variant: {
      text: "bg-transparent hover:bg-gray-100",
      contained: "shadow-sm",
      outlined: "border bg-transparent",
    },
    color: {
      inherit: "text-inherit hover:bg-gray-100",
      primary: "text-primary-foreground bg-primary hover:bg-primary/90",
      secondary: "text-secondary-foreground bg-secondary hover:bg-secondary/90",
      success: "text-success-foreground bg-success hover:bg-success/90",
      error: "text-error-foreground bg-error hover:bg-error/90",
      info: "text-info-foreground bg-info hover:bg-info/90",
      warning: "text-warning-foreground bg-warning hover:bg-warning/90",
    },
    size: {
      small: "h-8 px-3 text-xs",
      medium: "h-10 px-4 text-sm",
      large: "h-12 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
    disableElevation: {
      true: "shadow-none",
    },
  },
  defaultVariants: {
    variant: "contained",
    color: "primary",
    size: "medium",
    fullWidth: false,
    disableElevation: false,
  },
} as const;

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  buttonVariantsConfig,
);
