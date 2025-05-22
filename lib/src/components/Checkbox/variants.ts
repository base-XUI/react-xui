import { cva } from "class-variance-authority";

export type CheckboxColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "muted"
  | "";

export type CheckboxSize = "small" | "medium" | "large";

export const checkboxVariantsConfig = {
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      error: "",
      info: "",
      warning: "",
      muted: "",
      "": "",
    },
    state: {
      checked: "",
      unchecked: "",
      indeterminate: "",
    },
    size: {
      small: "h-5 w-5",
      medium: "h-6 w-6",
      large: "h-7 w-7",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "small",
  },
};

export const checkboxVariants = cva(
  "flex items-center justify-center transition-colors rounded cursor-pointer",
  {
    variants: checkboxVariantsConfig.variants,
    compoundVariants: [
      // Primary
      {
        color: "primary",
        state: "checked",
        className:
          "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90",
      },
      {
        color: "primary",
        state: "indeterminate",
        className:
          "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90",
      },

      // Secondary
      {
        color: "secondary",
        state: "checked",
        className:
          "text-secondary-foreground border-secondary-foreground bg-secondary hover:bg-secondary/90 ",
      },
      {
        color: "secondary",
        state: "indeterminate",
        className:
          "text-secondary-foreground border-secondary-foreground bg-secondary hover:bg-secondary/90 ",
      },

      // Success
      {
        color: "success",
        state: "checked",
        className:
          "text-success-foreground border-success-foreground bg-success hover:bg-success/90",
      },
      {
        color: "success",
        state: "indeterminate",
        className:
          "text-success-foreground border-success-foreground bg-success hover:bg-success/90",
      },

      // Muted
      {
        color: "muted",
        state: "checked",
        className:
          "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90",
      },
      {
        color: "muted",
        state: "indeterminate",
        className:
          "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90",
      },
      // Error
      {
        color: "error",
        state: "checked",
        className:
          "text-error-foreground border-error-foreground bg-error hover:bg-error/90",
      },
      {
        color: "error",
        state: "indeterminate",
        className:
          "text-error-foreground border-error-foreground bg-error hover:bg-error/90",
      },

      // Info
      {
        color: "info",
        state: "checked",
        className:
          "text-info-foreground border-info-foreground bg-info hover:bg-info/90",
      },
      {
        color: "info",
        state: "indeterminate",
        className:
          "text-info-foreground border-info-foreground bg-info hover:bg-info/90",
      },

      // Warning
      {
        color: "warning",
        state: "checked",
        className:
          "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90",
      },
      {
        color: "warning",
        state: "indeterminate",
        className:
          "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90",
      },
      // Empty color (default to muted)
      {
        color: "",
        state: "checked",
        className:
          "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90",
      },
      {
        color: "",
        state: "unchecked",
        className: "text-white border-muted-foreground hover:bg-muted/90",
      },
      {
        color: "",
        state: "indeterminate",
        className:
          "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90",
      },
    ],
    defaultVariants: {
      color: "primary" as CheckboxColor,
      size: "medium" as CheckboxSize,
    },
  },
);
