import type { ReactNode } from "react";

/**
 * @file
 * Type definitions for the FormGroup component.
 * This file defines all props accepted by the FormGroup component.
 */

/**
 * Props accepted by the FormGroup component.
 */
export interface FormGroupProps {
  /**
   * The content of the component.
   * Usually Checkbox or Radio elements.
   */
  children?: ReactNode;

  /**
   * Display group of elements in a compact row layout.
   * @default false
   */
  row?: boolean;

  /**
   * Optional additional class names for custom styling.
   */
  className?: string;

  /**
   * Inline styles to customize the component appearance.
   */
  sx?: React.CSSProperties;

  /**
   * If true, the group will active the row animation.
   */
  animation?: boolean;
}
