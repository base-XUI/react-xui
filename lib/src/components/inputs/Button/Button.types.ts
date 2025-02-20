import React from "react";
import type { VariantProps } from "class-variance-authority";
import type { PolymorphicComponent } from "@/types/polymorphic";
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
  type?: "button" | "submit" | "reset";
} & VariantProps<typeof buttonVariants>;

export type ButtonComponent = PolymorphicComponent<"button", ButtonBaseProps>;
