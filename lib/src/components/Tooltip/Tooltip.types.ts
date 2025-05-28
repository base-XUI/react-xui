import React from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";
import { tooltipVariants } from "./variants";
export type TooltipBaseProps = {
  title?: string;
  arrow?: boolean;
  disabled?: boolean;
  placement?:
  | "auto-end"
  | "auto-start"
  | "auto"
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
  open?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  id?: string;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  slotProps?: {
    arrow?: object;
    popper?: object;
    tooltip?: object;
    transition?: object;
  };

  slots?: {
    arrow?: React.ElementType;
    popper?: React.ElementType;
    tooltip?: React.ElementType;
    transition?: React.ElementType;
  };

  /**
   * @deprecated Use `slots` instead. This will be removed in a future release.
   */
  components?: {
    Arrow?: React.ElementType;
    Popper?: React.ElementType;
    Tooltip?: React.ElementType;
    Transition?: React.ElementType;
  };

  sx?: object;
} & VariantProps<typeof tooltipVariants>;

export type TooltipProps<C extends React.ElementType = "span"> =
  PolymorphicComponentProp<C, TooltipBaseProps>;

export type TooltipComponent = PolymorphicComponent<TooltipBaseProps, "span">;
