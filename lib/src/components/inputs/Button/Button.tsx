import React from "react";
import { buttonVariants } from "./variants";
import type { ButtonBaseProps } from "./Button.types";
import { cn } from "@/utils/cn";
import { createPolymorphic } from "@/utils/createPolymorphic";

export const Button = createPolymorphic<"button", ButtonBaseProps>(
  "button",
  "Button",
  ({
    className,
    variant = "contained",
    color = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    loadingPosition = "center",
    loadingIndicator = <span className="animate-spin">⚪</span>,
    startIcon,
    endIcon,
    fullWidth = false,
    disableElevation = false,
    type = "button",
    children,
    ...restProps
  }) => {
    const content = (
      <>
        {!loading && startIcon && (
          <span className="mr-2 -ml-0.5">{startIcon}</span>
        )}
        {loading && loadingPosition === "start" && (
          <span className="mr-2 -ml-0.5">{loadingIndicator}</span>
        )}
        {loading && loadingPosition === "center" ? loadingIndicator : children}
        {!loading && endIcon && <span className="-mr-0.5 ml-2">{endIcon}</span>}
        {loading && loadingPosition === "end" && (
          <span className="-mr-0.5 ml-2">{loadingIndicator}</span>
        )}
      </>
    );

    return React.createElement("button", {
      className: cn(
        buttonVariants({ variant, color, size, fullWidth, disableElevation }),
        className,
      ),
      disabled: disabled || loading,
      type,
      children: content,
      ...restProps,
    });
  },
);
