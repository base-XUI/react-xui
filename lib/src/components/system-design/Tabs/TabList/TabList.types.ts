import React from "react";

/**
 * Base props for the TabList component
 */
export type TabListBaseProps = {
  /**
   * The tabs to render inside the list.
   */
  children?: React.ReactNode;

  /**
   * Accessibility label.
   */
  "aria-label"?: string;

  /**
   * Current selected value.
   */
  value?: any;

  /**
   * Callback fired when tab is clicked.
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;

  /**
   * Layout orientation of the tabs.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Optional variant (scrollable or standard)
   */
  variant?: "scrollable" | "standard";

  /**
   * Additional Tailwind class names
   */
  className?: string;
};

/**
 * Props for TabList (No polymorphism, always renders as div)
 */
export type TabListProps = TabListBaseProps;
