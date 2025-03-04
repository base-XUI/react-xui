import React from "react";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./variants";
import { ButtonTypeMap, type ButtonProps } from "./Button.types";
import { PolymorphicComponent } from "@/utils/PolymorphicComponent";

const Button = React.forwardRef(function Button<
  RootComponentType extends React.ElementType,
>(
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
    ...rest
  }: ButtonProps<RootComponentType>,
  ref: React.ComponentPropsWithRef<RootComponentType>["ref"],
) {
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
        ? { disabled: isDisabled, "aria-disabled": isDisabled }
        : { role: "button", "aria-disabled": isDisabled })}
    >
      {content}
    </Component>
  );
}) as PolymorphicComponent<ButtonTypeMap>;

export { Button };
