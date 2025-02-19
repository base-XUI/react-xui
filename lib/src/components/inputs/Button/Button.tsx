import React from "react";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./variants";
import { type ButtonProps } from "./Button.types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      component,
      className,
      variant,
      color,
      size,
      fullWidth,
      disableElevation,
      loading,
      loadingPosition = "center",
      loadingIndicator = <span className="h-4 w-4 animate-spin">⌛</span>,
      startIcon,
      endIcon,
      children,
      disabled,
      href,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const Component = href ? "a" : component || "button";
    const isDisabled = disabled || loading;

    const renderLoadingIndicator = () => (
      <span
        className={cn(
          "inline-flex items-center",
          loadingPosition === "start" && "mr-2",
          loadingPosition === "end" && "ml-2",
        )}
      >
        {loadingIndicator}
      </span>
    );

    const content = (
      <>
        {loading && loadingPosition === "start" && renderLoadingIndicator()}
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {loading && loadingPosition === "center" ? (
          <span className="flex items-center gap-2">
            {renderLoadingIndicator()}
            {children}
          </span>
        ) : (
          children
        )}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
        {loading && loadingPosition === "end" && renderLoadingIndicator()}
      </>
    );

    return (
      <Component
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            fullWidth,
            disableElevation,
            className,
          }),
        )}
        {...rest}
        {...(Component === "button"
          ? { type, disabled: isDisabled }
          : { role: "button", "aria-disabled": isDisabled })}
        {...(href && { href })}
      >
        {content}
      </Component>
    );
  },
) as React.ForwardRefExoticComponent<
  ButtonProps<React.ElementType> & React.RefAttributes<unknown>
>;

Button.displayName = "Button";

export { Button, type ButtonProps };
