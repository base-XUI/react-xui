import React from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";
import { TooltipPlacement, tooltipVariants } from "./variants";

export type TooltipBaseProps = {
  title?: string;
  arrow?: boolean;
  disabled?: boolean;

  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableInteractive?: boolean;
  disableTouchListener?: boolean;

  placement?: TooltipPlacement;
  open?: boolean;

  enterDelay?: number;
  enterNextDelay?: number;
  enterTouchDelay?: number;
  leaveDelay?: number;
  leaveTouchDelay?: number;

  followCursor?: boolean;

  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;

  id?: string;

  slotProps?: {
    tooltip?: object;
    popper?: object;
    transition?: object;
    arrow?: object;
  };

  slots?: {
    tooltip?: React.ElementType;
    popper?: React.ElementType;
    transition?: React.ElementType;
    arrow?: React.ElementType;
  };

  /**
   * @deprecated Use `slots` instead. This will be removed in a future release.
   */
  components?: {
    Tooltip?: React.ElementType;
    Popper?: React.ElementType;
    Arrow?: React.ElementType;
    Transition?: React.ElementType;
  };

  sx?: object;
} & VariantProps<typeof tooltipVariants>;

export type TooltipProps<C extends React.ElementType = "span"> =
  PolymorphicComponentProp<C, TooltipBaseProps>;

export type TooltipComponent = PolymorphicComponent<TooltipBaseProps, "span">;
