import { cva, VariantProps } from "class-variance-authority";

export type CheckboxColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "muted";

export type CheckboxSize = "small" | "medium" | "large";

const generateCheckboxColorStyles = (
  color: CheckboxColor,
  styles: string,
): {
  color: CheckboxColor;
  state: "checked" | "indeterminate";
  className: string;
}[] => [
  { color, state: "checked", className: styles },
  { color, state: "indeterminate", className: styles },
];

export const checkboxVariants = cva(
  "flex items-center justify-center transition-colors rounded cursor-pointer border",
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
        unchecked: "hover:bg-gray-50",
        indeterminate: "",
      },

      size: {
        small: "h-4 w-4 text-xs",
        medium: "h-5 w-5 text-sm",
        large: "h-6 w-6 text-base",
      },
    },
    compoundVariants: [
      ...generateCheckboxColorStyles(
        "primary",
        "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90",
      ),
      ...generateCheckboxColorStyles(
        "secondary",
        "text-secondary-foreground border-secondary bg-secondary hover:bg-secondary/90",
      ),
      ...generateCheckboxColorStyles(
        "success",
        "text-success-foreground border-success-foreground bg-success hover:bg-success/90",
      ),
      ...generateCheckboxColorStyles(
        "error",
        "text-error-foreground border-error-foreground bg-error hover:bg-error/90",
      ),
      ...generateCheckboxColorStyles(
        "info",
        "text-info-foreground border-info-foreground bg-info hover:bg-info/90",
      ),
      ...generateCheckboxColorStyles(
        "warning",
        "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90",
      ),
      ...generateCheckboxColorStyles(
        "muted",
        "text-muted-foreground border-muted bg-muted hover:bg-muted/90",
      ),
      {
        state: "unchecked",
        className: "border-gray-300 hover:border-gray-400",
      },
    ],

    defaultVariants: {
      color: "primary",
      size: "medium",
      state: "unchecked",
    },
  },
);

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
