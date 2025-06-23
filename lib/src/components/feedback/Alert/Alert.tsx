import React from "react";
import { cn } from "@/utils/cn";
import { alertVariants, alertTitleStyles } from "./variants";
import { type AlertProps, type AlertTitleProps } from "./Alert.types";
import { adaptPropsForA11y } from "@/utils/a11y";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react";

// Default icon mapping based on severity
const defaultIconMapping = {
  success: <CheckCircle className="mt-0.5 h-5 w-5" />,
  info: <AlertCircle className="mt-0.5 h-5 w-5" />,
  warning: <AlertTriangle className="mt-0.5 h-5 w-5" />,
  error: <XCircle className="mt-0.5 h-5 w-5" />,
};

/**
 * Alert component that displays brief and potentially time-sensitive information
 */
const Alert = <C extends React.ElementType = "div">({
  component,
  className,
  severity = "success",
  variant = "default",
  color,
  icon,
  action,
  onClose,
  role = "alert",
  children,
  ref,
  ...rest
}: AlertProps<C>) => {
  const Component = component || "div";

  // Determine which icon to display
  const renderIcon = () => {
    if (icon === false) return null;
    if (icon) return icon;
    return defaultIconMapping[severity];
  };

  // Render close button if onClose is provided and no action is specified
  const renderAction = () => {
    if (action) return action;
    if (onClose) {
      return (
        <button
          type="button"
          className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full p-1 hover:bg-black/10 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      );
    }
    return null;
  };

  // Use a11y utility to handle accessibility attributes
  const a11yProps = adaptPropsForA11y(
    { role, ...rest },
    typeof Component === "string" ? Component : "div",
  );

  return (
    <Component
      ref={ref}
      className={cn(
        alertVariants({
          variant,
          severity,
          color,
          className,
        }),
      )}
      {...a11yProps}
    >
      {renderIcon()}
      <div className="flex-1">{children}</div>
      {renderAction()}
    </Component>
  );
};

/**
 * AlertTitle component for adding a title to an Alert
 */
const AlertTitle = <C extends React.ElementType = "div">({
  component,
  className,
  children,
  ref,
  ...rest
}: AlertTitleProps<C>) => {
  const Component = component || "div";

  // Use a11y utility to handle accessibility attributes
  const a11yProps = adaptPropsForA11y(
    { ...rest },
    typeof Component === "string" ? Component : "div",
  );

  return (
    <Component
      ref={ref}
      className={cn(alertTitleStyles, className)}
      {...a11yProps}
    >
      {children}
    </Component>
  );
};

Alert.displayName = "Alert";
AlertTitle.displayName = "AlertTitle";

export { Alert, AlertTitle };
