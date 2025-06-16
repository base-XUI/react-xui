import { cva, VariantProps } from "class-variance-authority";

export type RadioColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "muted";

export type RadioSize = "small" | "medium" | "large";

const generateColorVariants = (
  color: RadioColor,
  checkedStyles: string,
  uncheckedStyles: string = "",
): {
  color: RadioColor;
  state: "checked" | "unchecked";
  className: string;
}[] => {
  const variants = [];

  variants.push({
    color,
    state: "checked" as const,
    className: checkedStyles,
  });

  if (uncheckedStyles) {
    variants.push({
      color,
      state: "unchecked" as const,
      className: uncheckedStyles,
    });
  }

  return variants;
};

export const radioVariants = cva(
  "flex items-center justify-center transition-colors rounded-full cursor-pointer border",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        info: "",
        warning: "",
        muted: "",
      },
      state: {
        checked: "",
        unchecked: "bg-transparent hover:bg-gray-50",
      },
      size: {
        small: "h-4 w-4",
        medium: "h-5 w-5",
        large: "h-6 w-6",
      },
    },

    compoundVariants: [
      ...generateColorVariants(
        "primary",
        "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90",
        "text-primary-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "secondary",
        "text-secondary-foreground border-secondary bg-secondary hover:bg-secondary/90",
        "text-secondary-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "success",
        "text-success-foreground border-success-foreground bg-success hover:bg-success/90",
        "text-success-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "error",
        "text-error-foreground border-error-foreground bg-error hover:bg-error/90",
        "text-error-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "info",
        "text-info-foreground border-info-foreground bg-info hover:bg-info/90",
        "text-info-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "warning",
        "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90",
        "text-warning-foreground border-gray-300 hover:border-gray-400",
      ),
      ...generateColorVariants(
        "muted",
        "text-muted-foreground border-muted bg-muted hover:bg-muted/90",
        "text-muted-foreground border-gray-300 hover:border-gray-400",
      ),
    ],

    defaultVariants: {
      color: "primary",
      size: "medium",
      state: "unchecked",
    },
  },
);

export type RadioVariantProps = VariantProps<typeof radioVariants>;
