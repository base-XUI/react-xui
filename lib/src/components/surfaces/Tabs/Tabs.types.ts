import * as React from "react";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Base props for Tabs component
 */
export type TabsBaseProps = {
  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  /**
   * The value of the currently selected tab.
   */
  value?: any;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: any;
  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Determines the tabs display variant.
   * @default 'standard'
   */
  variant?: "standard" | "scrollable" | "fullWidth";
  /**
   * If true, the selected tab changes on focus.
   * @default false
   */
  selectionFollowsFocus?: boolean;
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor?: "primary" | "secondary";
  /**
   * Determines the color of the text.
   * @default 'inherit'
   */
  textColor?: "inherit" | "primary" | "secondary";
  /**
   * If true, the tabs will be centered.
   * @default false
   */
  centered?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
};

/**
 * Props for the Tabs component including the ref
 */
export type TabsProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, TabsBaseProps>;

/**
 * Tabs component type
 */
export type TabsComponent = PolymorphicComponent<TabsBaseProps, "div">;
