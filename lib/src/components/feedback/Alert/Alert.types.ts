import React from "react";
import type { VariantProps } from "class-variance-authority";
import { alertVariants } from "./variants.ts";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Alert severity types
 */
export type AlertSeverity = "success" | "info" | "warning" | "error";

/**
 * Alert variant types
 */
export type AlertVariant = "filled" | "outlined" | "default";

/**
 * Alert color types
 */
export type AlertColor = "success" | "info" | "warning" | "error";

/**
 * Icon mapping type for Alert component
 */
export type AlertIconMapping = {
  [key in AlertSeverity]?: React.ReactNode;
};

/**
 * Base props for the Alert component
 */
export type AlertBaseProps = {
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: AlertSeverity;

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: AlertVariant;

  /**
   * Override the default color for the specified severity.
   */
  color?: AlertColor;

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the severity prop.
   */
  icon?: React.ReactNode | false;

  /**
   * Override the default icons for different severity levels.
   */
  iconMapping?: AlertIconMapping;

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;

  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: string;
} & VariantProps<typeof alertVariants>;

/**
 * Props for the Alert component including the ref
 * Compatible with React 19's new ref handling
 */
export type AlertProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, AlertBaseProps>;

/**
 * Alert component type
 */
export type AlertComponent = PolymorphicComponent<AlertBaseProps, "div">;

/**
 * Props for the AlertTitle component
 */
export type AlertTitleProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, {}>;

/**
 * AlertTitle component type
 */
export type AlertTitleComponent = PolymorphicComponent<{}, "div">;
