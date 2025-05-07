import React from "react";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Base props for the Tabs component matching MUI Tabs API
 */
export type TabsBaseProps = {
  /**
   * Callback fired when the component mounts. Supports updateIndicator() and updateScrollButtons()
   */
  action?: React.Ref<any>;

  /**
   * If true, the scroll buttons aren't forced hidden on mobile.
   */
  allowScrollButtonsMobile?: boolean;

  /**
   * The label for the Tabs as a string.
   */
  "aria-label"?: string;

  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  "aria-labelledby"?: string;

  /**
   * If true, the tabs are centered.
   */
  centered?: boolean;

  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Record<string, string>;

  /**
   * The component used for the root node.
   */
  component?: React.ElementType;

  /**
   * Determines the color of the indicator.
   */
  indicatorColor?: "primary" | "secondary" | string;

  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;

  /**
   * The component orientation.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The component used to render the scroll buttons (deprecated).
   */
  ScrollButtonComponent?: React.ElementType;

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll.
   */
  scrollButtons?: "auto" | false | true;

  /**
   * If true the selected tab changes on focus.
   */
  selectionFollowsFocus?: boolean;

  /**
   * The props used for each slot inside.
   */
  slotProps?: Record<string, any>;

  /**
   * The components used for each slot inside.
   */
  slots?: Record<string, React.ElementType>;

  /**
   * The system prop that allows defining system overrides and styles.
   */
  sx?: object | ((theme: any) => object);

  /**
   * Props applied to the tab indicator element (deprecated).
   */
  TabIndicatorProps?: object;

  /**
   * Props applied to the TabScrollButton element (deprecated).
   */
  TabScrollButtonProps?: object;

  /**
   * Determines the color of the Tab.
   */
  textColor?: "inherit" | "primary" | "secondary";

  /**
   * The value of the currently selected Tab.
   */
  value?: any;

  /**
   * Determines additional display behavior of the tabs.
   */
  variant?: "fullWidth" | "scrollable" | "standard";

  /**
   * If true, the scrollbar is visible.
   */
  visibleScrollbar?: boolean;
};

/**
 * Polymorphic Tabs props
 */
export type TabsProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, TabsBaseProps>;

/**
 * Tabs component type
 */
export type TabsComponent = PolymorphicComponent<TabsBaseProps, "div">;
