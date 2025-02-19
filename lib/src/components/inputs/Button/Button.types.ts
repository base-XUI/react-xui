import React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";

export type ButtonBaseProps = {
  loading?: boolean;
  loadingPosition?: "start" | "center" | "end";
  loadingIndicator?: React.ReactNode;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  component?: React.ElementType;
} & VariantProps<typeof buttonVariants>;

export type ButtonProps<C extends React.ElementType = "button"> =
  ButtonBaseProps &
    Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps>;
