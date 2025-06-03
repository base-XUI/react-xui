import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { SnackbarProps } from "./Snackbar.types";
import { getPositionClasses } from "./variants";
import { SnackbarContent } from "./SnackbarContent";

export const Snackbar: React.FC<SnackbarProps> = ({
  action,
  message,
  children,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  onClose,
  open,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!open && !isVisible) return null;

  const positionClasses = getPositionClasses(anchorOrigin);

  return (
    <div
      className={cn(
        "fixed z-50 flex max-w-md min-w-[356px] items-center rounded-md bg-white text-black",
        positionClasses,
        className,
      )}
      role="alert"
    >
      <SnackbarContent action={action} message={message}>
        {children}
      </SnackbarContent>
    </div>
  );
};

Snackbar.displayName = "Snackbar";
