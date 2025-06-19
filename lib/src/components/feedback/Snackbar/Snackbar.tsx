import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { SnackbarProps } from "./Snackbar.types";
import { snackbarVariants, getSnackbarVariantProps } from "./variants";
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
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsVisible(false);

      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      if (autoHideDuration) {
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, autoHideDuration);

        return () => {
          clearTimeout(enterTimer);
          clearTimeout(hideTimer);
        };
      }

      return () => clearTimeout(enterTimer);
    } else {
      setIsVisible(false);
    }
  }, [open, autoHideDuration]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && !isVisible) {
      setShouldRender(false);
      if (onClose) onClose();
    }
  };

  if (!shouldRender) return null;

  const variantProps = getSnackbarVariantProps(anchorOrigin, isVisible);

  return (
    <div
      className={cn(snackbarVariants(variantProps), className)}
      role="alert"
      onTransitionEnd={handleTransitionEnd}
      {...restProps}
    >
      <SnackbarContent action={action} message={message}>
        {children}
      </SnackbarContent>
    </div>
  );
};

Snackbar.displayName = "Snackbar";
