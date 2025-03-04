import React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Base props for the Button component
 */
export type ButtonBaseProps = {
  /**
   * If true, the button will show a loading indicator.
   */
  loading?: boolean;
  /**
   * The position of the loading indicator.
   */
  loadingPosition?: "start" | "center" | "end";
  /**
   * Element displayed when the button is in loading state.
   */
  loadingIndicator?: React.ReactNode;
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * If true, the button will be disabled.
   * This is handled differently based on component type.
   */
  disabled?: boolean;
} & VariantProps<typeof buttonVariants>;

/**
 * Props for the Button component including the ref
 * Compatible with React 19's new ref handling
 */
export type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C, ButtonBaseProps>;

/**
 * Button component type
 */
export type ButtonComponent = PolymorphicComponent<ButtonBaseProps, "button">;
