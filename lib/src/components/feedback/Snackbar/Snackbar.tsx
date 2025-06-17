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
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsVisible(false); // Start with hidden state

      // Use setTimeout to ensure the element is rendered with initial state first
      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10); // Small delay to ensure DOM update

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

  // Handle the end of exit animation
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Only handle our own transition, not child transitions
    if (e.target === e.currentTarget && !isVisible) {
      setShouldRender(false);
      if (onClose) onClose();
    }
  };

  if (!shouldRender) return null;

  const positionClasses = getPositionClasses(anchorOrigin);

  // Determine slide direction based on position
  const getAnimationClasses = () => {
    const { vertical } = anchorOrigin;

    if (vertical === "top") {
      return isVisible
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0";
    } else if (vertical === "bottom") {
      return isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-full opacity-0";
    }

    // Fallback for other positions
    return isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0";
  };

  return (
    <div
      className={cn(
        "fixed z-50 flex max-w-md min-w-[356px] items-center rounded-md border border-solid border-white bg-white text-black",
        "transition-all duration-300 ease-in-out",
        positionClasses,
        getAnimationClasses(),
        className,
      )}
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
