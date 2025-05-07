import * as React from "react";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

export type TabBaseProps = {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The label for the tab.
   */
  label?: React.ReactNode;
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: any;
  /**
   * Callback fired when the tab is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * If true, the tab will have a ripple effect when clicked.
   * @default true
   */
  disableRipple?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;
  /**
   * If true, the keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
};

export type TabProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C, TabBaseProps>;

export type TabComponent = PolymorphicComponent<TabBaseProps, "button">;
