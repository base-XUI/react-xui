import React from "react";
import { buttonVariants } from "./variants";
import type { ButtonProps, ButtonComponent } from "./Button.types";
import { cn } from "@/utils/cn";
import { Slot } from "../../core/Slot/Slot";

const ButtonComponent = React.forwardRef(function Button(
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
    type = "button",
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const Comp = component || "button";
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
    type: type,
    ...props,
  };

  if (component) {
    return <Slot {...buttonProps}>{content}</Slot>;
  }

  return <Comp {...buttonProps}>{content}</Comp>;
}) as ButtonComponent;

ButtonComponent.displayName = "Button";

export const Button = ButtonComponent;
export type * from "./Button.types";
