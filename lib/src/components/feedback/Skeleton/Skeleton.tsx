import React from "react";
import { cn } from "@/utils/cn";
import { skeletonVariants, skeletonAnimationVariants } from "./variants";
import { SkeletonProps } from "./Skeleton.types";

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      animation = "pulse",
      children,
      className,
      component: Component = "span",
      height,
      variant = "text",
      width,
      style,
      ...other
    },
    ref
  ) => {
    // If children are provided, we can use them to infer dimensions
    const hasChildren = Boolean(children);

    // Determine the animation class based on the animation prop
    const animationClass = animation !== false ? skeletonAnimationVariants[animation] : "";

    // Combine all styles
    const combinedStyles = {
      width: hasChildren ? undefined : width,
      height: hasChildren ? undefined : height,
      ...style,
    };

    // If there are children, wrap them in a hidden container to infer dimensions
    if (hasChildren) {
      return (
        <Component
          ref={ref}
          className={cn(
            skeletonVariants({ variant }),
            animationClass,
            className
          )}
          style={combinedStyles}
          {...other}
        >
          <div className="invisible">{children}</div>
        </Component>
      );
    }

    // Otherwise, render a simple skeleton with the provided dimensions
    return (
      <Component
        ref={ref}
        className={cn(
          skeletonVariants({ variant }),
          animationClass,
          className
        )}
        style={combinedStyles}
        {...other}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";