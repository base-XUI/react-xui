import React from "react";
import type { VariantProps } from "class-variance-authority";
import type {
    PolymorphicComponentProp,
    PolymorphicComponent,
} from "@/utils/polymorphic";
import { tooltipVariants } from "./variants";



export type TooltipBaseProps = {
    /**
     * Tooltip title content.
     */
    title?: React.ReactNode;
    /**
     * If true, adds an arrow to the tooltip.
     */
    arrow?: boolean;
    /**
     * Tooltip placement.
     */
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
    /**
     * If true, the tooltip is visible.
     */
    open?: boolean;
    /**
     * Delay before showing the tooltip (in ms).
     */
    enterDelay?: number;
    /**
     * Delay before hiding the tooltip (in ms).
     */
    leaveDelay?: number;
    /**
     * Callback when tooltip is opened.
     */
    onOpen?: (event: React.SyntheticEvent) => void;
    /**
     * Callback when tooltip is closed.
     */
    onClose?: (event: React.SyntheticEvent) => void;
    /**
     * Used to set an ID for accessibility.
     */
    id?: string;
    /**
     * If true, disables the hover listener.
     */
    disableHoverListener?: boolean;
    /**
     * If true, disables the focus listener.
     */
    disableFocusListener?: boolean;
    /**
     * If true, disables the touch listener.
     */
    disableTouchListener?: boolean;
    /**
     * If true, the title is used as a description rather than label.
     */
    describeChild?: boolean;
    /**
     * Additional props for slot components.
     */
    slotProps?: {
        arrow?: object;
        popper?: object;
        tooltip?: object;
        transition?: object;
    };
    /**
     * Components used in each slot.
     */
    slots?: {
        arrow?: React.ElementType;
        popper?: React.ElementType;
        tooltip?: React.ElementType;
        transition?: React.ElementType;
    };
    /**
     * Additional system styling or sx overrides.
     */
    sx?: object;
} & VariantProps<typeof tooltipVariants>;

/**
 * Tooltip props with polymorphism
 */
export type TooltipProps<C extends React.ElementType = "span"> =
    PolymorphicComponentProp<C, TooltipBaseProps>;

/**
 * Tooltip component type
 */
export type TooltipComponent = PolymorphicComponent<TooltipBaseProps, "span">;
