import React from "react";
import { buttonVariants } from "./variants";
import { ButtonProps } from "./Button.types";
import { cn } from "@/utils/cn";
import { Slot } from "../../core/Slot";

const Button = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      children,
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
      component,
      href,
      type = "button",
      ...props
    }: ButtonProps<C>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const Comp = component || (href ? "a" : "button");
    const buttonClassName = cn(
      buttonVariants({
        variant,
        color,
        size,
        fullWidth,
        disableElevation,
      }),
      className,
    );

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

    const buttonProps = {
      ref,
      className: buttonClassName,
      disabled: disabled || loading,
      type: href ? undefined : type,
      href,
      ...props,
    };

    if (component) {
      return <Slot {...buttonProps}>{content}</Slot>;
    }

    return <Comp {...buttonProps}>{content}</Comp>;
  },
);

Button.displayName = "Button";

export { Button };
