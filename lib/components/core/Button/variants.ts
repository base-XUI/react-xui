import { cva } from "class-variance-authority";

export const buttonVariantsConfig = {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
} as const;

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  buttonVariantsConfig
);
