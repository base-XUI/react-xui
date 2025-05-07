import * as React from "react";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

export type TabListBaseProps = {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * If true, the scrollbar is visible.
   * @default false
   */
  visibleScrollbar?: boolean;
  /**
   * If true, the tabs will be centered.
   * @default false
   */
  centered?: boolean;
};

export type TabListProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, TabListBaseProps>;

export type TabListComponent = PolymorphicComponent<TabListBaseProps, "div">;
