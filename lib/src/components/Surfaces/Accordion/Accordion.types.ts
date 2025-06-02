import React from "react";
import type { VariantProps } from "class-variance-authority";
import { accordionVariants } from "./variants";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Base props for the Accordion component
 */
export type AccordionBaseProps = {
  /**
   * The content of the accordion.
   */
  children: React.ReactNode;
  /**

  /**
   * If true, disables the accordion.
   */
  disabled?: boolean;
  /**
   * The icon element to display as the expand/collapse indicator.
   */
  expandIcon?: React.ReactNode;
  /**
   * If true, expands the accordion by default.
   */
  defaultExpanded?: boolean;
  /**
   * Callback fired when the accordion is expanded/collapsed.
   *  Uncontrolled mode
   */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  /**
   * If true, removes the default gutters (padding) from the accordion.
   */
  disableGutters?: boolean;
  /**
   * If true, expands the accordion (controlled mode).
   */
  expanded?: boolean;
  /**
   * If true, the accordion will have square corners.
   */
  square?: boolean;
  /**
   * Additional class name(s) for custom styling.
   */
  className?: string;
  /**
   * The id of the accordion element.
   */
  id?: string;
  slots?: {
    heading?: { component?: React.ElementType };
  };
  iconPosition?: "left" | "right";
} & VariantProps<typeof accordionVariants>;

/**
 * Props for the Accordion component including the ref
 * Compatible with React 19's new ref handling
 */
export type AccordionProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, AccordionBaseProps>;

/**
 * Accordion component type
 */
export type AccordionComponent = PolymorphicComponent<
  AccordionBaseProps,
  "div"
>;
