import React from "react";

/**
 * Base props for the TabPanel component
 */
export type TabPanelBaseProps = {
  /**
   * The content inside the panel.
   */
  children?: React.ReactNode;

  /**
   * Value identifying the panel.
   */
  value?: any;

  /**
   * The currently active value.
   */
  activeValue?: any;

  /**
   * If `true`, the panel is hidden.
   */
  hidden?: boolean;

  /**
   * Additional Tailwind class names.
   */
  className?: string;
};

/**
 * Props for TabPanel (No polymorphism, always renders as div)
 */
export type TabPanelProps = TabPanelBaseProps;
