import React from "react";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./variants";
import { type ButtonProps } from "./Button.types";
import { adaptPropsForA11y } from "@/utils/a11y";

const Button = <C extends React.ElementType = "button">({
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
  ref,
  ...rest
}: ButtonProps<C>) => {
  const Component = component || "button";
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

  // Use a11y utility to handle accessibility attributes
  const a11yProps = adaptPropsForA11y(
    { disabled: isDisabled, ...rest },
    typeof Component === "string" ? Component : "div",
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
      {...a11yProps}
    >
      {content}
    </Component>
  );
};

Button.displayName = "Button";

export { Button };
