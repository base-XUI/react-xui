import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { SnackbarProps } from "./Snackbar.types";
import { getPositionClasses } from "./variants";
import { SnackbarContent } from "./_SnackbarContent";

/**
 * Snackbar component for displaying brief notifications
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  action,
  message,
  children,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  sx,
  onClose,
  open,
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

  // If not open and not in transition, don't render
  if (!open && !isVisible) return null;

  // Get position classes based on anchorOrigin
  const positionClasses = getPositionClasses(anchorOrigin);

  return (
    <div
      className={cn(
        "fixed z-50 flex max-w-md min-w-[300px] items-center rounded-md bg-white text-black shadow-md",
        positionClasses,
        className,
      )}
      style={{ ...sx }}
      role="alert"
    >
      {/* Content */}
      <SnackbarContent action={action} message={message}>
        {children}
      </SnackbarContent>
    </div>
  );
};

Snackbar.displayName = "Snackbar";
