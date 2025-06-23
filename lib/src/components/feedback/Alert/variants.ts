import { cva } from "class-variance-authority";

// Define variant types for better type safety
type AlertVariant = "filled" | "outlined" | "default";

type AlertSeverity = "success" | "info" | "warning" | "error";

// Configuration object that we can export for use in stories
export const alertVariantsConfig = {
  variants: {
    variant: {
      default: "",
      filled: "",
      outlined: "border",
    },
    severity: {
      success: "",
      info: "",
      warning: "",
      error: "",
    },
    color: {
      success: "",
      info: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: {
    variant: "outlined",
    severity: "success",
  },
};

export const alertVariants = cva(
  "flex items-center gap-2 p-4 rounded-md transition-colors",
  {
    variants: alertVariantsConfig.variants,
    compoundVariants: [
      {
        variant: "default",
        severity: "success",
        className: "bg-success/5 text-success",
      },
      {
        variant: "default",
        severity: "info",
        className: "bg-info/5 text-info",
      },
      {
        variant: "default",
        severity: "warning",
        className: "bg-warning/5 text-warning",
      },
      {
        variant: "default",
        severity: "error",
        className: "bg-error/5 text-error",
      },
      {
        variant: "outlined",
        severity: "success",
        className: "border-success/50  text-success",
      },
      {
        variant: "outlined",
        severity: "info",
        className: "border-info/50  text-info",
      },
      {
        variant: "outlined",
        severity: "warning",
        className: "border-warning/50  text-warning",
      },
      {
        variant: "outlined",
        severity: "error",
        className: "border-error/50  text-error",
      },
      // Filled variant with severity colors
      {
        variant: "filled",
        severity: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "filled",
        severity: "info",
        className: "bg-info text-info-foreground",
      },
      {
        variant: "filled",
        severity: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "filled",
        severity: "error",
        className: "bg-error text-error-foreground",
      },
      // Color overrides for outlined variant
      {
        variant: "outlined",
        color: "success",
        className: "border-success/50 bg-success/5 text-success",
      },
      {
        variant: "outlined",
        color: "info",
        className: "border-info/50 bg-info/5 text-info",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "border-warning/50 bg-warning/5 text-warning",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-error/50 bg-error/5 text-error",
      },
      // Color overrides for filled variant
      {
        variant: "filled",
        color: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "filled",
        color: "info",
        className: "bg-info text-info-foreground",
      },
      {
        variant: "filled",
        color: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "filled",
        color: "error",
        className: "bg-error text-error-foreground",
      },
      // Color overrides for default variant
      {
        variant: "default",
        color: "success",
        className: "bg-success/5 text-success",
      },
      {
        variant: "default",
        color: "info",
        className: "bg-info/5 text-info",
      },
      {
        variant: "default",
        color: "warning",
        className: "bg-warning/5 text-warning",
      },
      {
        variant: "default",
        color: "error",
        className: "bg-error/5 text-error",
      },
    ],
    defaultVariants: {
      variant: "default" as AlertVariant,
      severity: "success" as AlertSeverity,
    },
  },
);

// Alert title styles
export const alertTitleStyles = "font-medium text-base mb-1";
