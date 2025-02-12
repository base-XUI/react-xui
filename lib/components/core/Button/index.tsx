import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { buttonVariants } from "./variants";

type ButtonBaseProps = {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  component?: React.ElementType;
} & VariantProps<typeof buttonVariants>;

type ButtonProps<C extends React.ElementType = "button"> = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      component,
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const Component = component || "button";
    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...rest}
        {...(Component === "button"
          ? { type, disabled: isDisabled }
          : { role: "button", "aria-disabled": isDisabled })}
      >
        {isLoading && <span className="mr-2 h-4 w-4 animate-spin">⌛</span>}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
) as React.ForwardRefExoticComponent<
  ButtonProps<React.ElementType> & React.RefAttributes<unknown>
>;

Button.displayName = "Button";

export { Button, type ButtonProps };
