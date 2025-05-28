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
  disableTouchListener?: boolean; // for future enhancement
  placement?: TooltipPlacement;
  open?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  id?: string;
  slotProps?: {
    tooltip?: object;
    popper?: object;
    transition?: object;
  };
  slots?: {
    tooltip?: React.ElementType;
    popper?: React.ElementType;
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
