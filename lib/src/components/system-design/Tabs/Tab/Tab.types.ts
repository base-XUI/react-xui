import React from "react";

export type TabBaseProps = {
  /**
   * The content of the tab (label or element).
   */
  label?: React.ReactNode;

  /**
   * The icon to display in the tab.
   */
  icon?: React.ReactNode;

  /**
   * The position of the icon relative to the label.
   * @default 'start'
   */
  iconPosition?: "start" | "end";

  /**
   * If `true`, the tab will be disabled.
   */
  disabled?: boolean;

  /**
   * A value identifying the tab. Used to match with TabPanel.
   */
  value?: any;

  /**
   * If `true`, the tab is currently selected.
   */
  selected?: boolean;

  /**
   * Callback fired when the tab is clicked.
   */
  onClick?: (event: React.SyntheticEvent) => void;

  /**
   * Content inside the tab (if not using `label`)
   */
  children?: React.ReactNode;

  /**
   * Additional class name or style support.
   */
  className?: string;
};

export type TabProps = TabBaseProps;
