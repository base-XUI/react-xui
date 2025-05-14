import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { SnackbarProps } from "./Snackbar.types";
import {
  severityConfig,
  getPositionClasses,
  getVariantClasses,
  getTransitionClasses,
} from "./variants";

/**
 * Snackbar component for displaying brief notifications
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  action,
  message,
  children,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  style,
  onClose,
  open,
  severity = "primary",
  variant = "filled",
  withCloseIcon = true,
  closeIcon,
  customIcon,
  transition = "fade",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle auto-hide functionality
  useEffect(() => {
    if (open) {
      setIsVisible(true);

      if (autoHideDuration) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [open, autoHideDuration, onClose]);

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // If not open and not in transition, don't render
  if (!open && !isVisible) return null;

  // Get position classes based on anchorOrigin
  const positionClasses = getPositionClasses(anchorOrigin);

  // Get variant classes based on severity and variant
  const variantClasses = getVariantClasses(severity, variant);

  // Get transition classes
  const transitionClasses = getTransitionClasses(transition, isVisible);

  // Get the icon based on severity or custom icon
  const icon = customIcon || severityConfig[severity].icon;

  return (
    <div
      className={cn(
        "fixed z-50 flex max-w-md min-w-[300px] items-center rounded-md p-4 shadow-md",
        positionClasses,
        variantClasses,
        transitionClasses,
        className,
      )}
      style={style}
      role="alert"
    >
      {/* Icon */}
      {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}

      {/* Content */}
      <div className="flex-grow">{message || children}</div>

      {/* Action */}
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}

      {/* Close Button */}
      {withCloseIcon && (
        <button
          onClick={handleClose}
          className="ml-2 flex-shrink-0 rounded-full p-1 hover:cursor-pointer hover:bg-black/10"
          aria-label="Close"
        >
          {closeIcon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

Snackbar.displayName = "Snackbar";
