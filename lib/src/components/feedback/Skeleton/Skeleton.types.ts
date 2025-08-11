import React from "react";
import { VariantProps } from "class-variance-authority";
import { skeletonVariants } from "./variants";

/**
 * Base props for the Skeleton component
 */
export type SkeletonBaseProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof skeletonVariants> & {
    /**
     * The animation. If false the animation effect is disabled.
     */
    animation?: "pulse" | "wave" | false;
    /**
     * Optional children to infer width and height from.
     */
    children?: React.ReactNode;
    /**
     * The component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: React.ElementType;
    /**
     * Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: number | string;
    /**
     * Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
    /**
     * The type of content that will be rendered.
     */
    variant?: "text" | "circular" | "rectangular" | "rounded";
  };

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = SkeletonBaseProps;