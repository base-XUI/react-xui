import { cva } from "class-variance-authority";

type AlertVariant = "filled" | "outlined" | "default";

type AlertSeverity = "success" | "info" | "warning" | "error";

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
  "flex  gap-3 px-4 py-3 rounded-md transition-colors",
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

export const alertTitleStyles = "font-medium text-base mb-1";
