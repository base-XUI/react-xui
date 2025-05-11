import React, { useEffect, useRef, useCallback, useState } from "react";
import type { SnackbarProps, SnackbarOrigin } from "./Snackbar.types";
import clsx from "clsx";

const defaultAnchorOrigin: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const getPositionClass = (origin: SnackbarOrigin) => {
  const vertical = origin.vertical;
  const horizontal = origin.horizontal;
  return clsx(
    "fixed z-50",
    vertical === "top" ? "top-6" : "bottom-6",
    horizontal === "left" && "left-6",
    horizontal === "center" && "left-1/2 -translate-x-1/2",
    horizontal === "right" && "right-6",
  );
};

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  autoHideDuration = 4000,
  message,
  action,
  anchorOrigin = defaultAnchorOrigin,
  onClose,
  className,
  style,
  children,
}) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (onClose) {
        onClose(event, reason);
      } else {
        setInternalOpen(false);
      }
    },
    [onClose],
  );

  useEffect(() => {
    if ((onClose ? open : internalOpen) && autoHideDuration != null) {
      timer.current = setTimeout(() => {
        handleClose(undefined, "timeout");
      }, autoHideDuration);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }
    return undefined;
  }, [open, internalOpen, autoHideDuration, handleClose, onClose]);

  if (!(onClose ? open : internalOpen)) return null;

  const content = (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        "flex max-w-[568px] min-w-[288px] items-center rounded bg-white px-4 py-3 text-black shadow-lg",
        className,
      )}
      style={style}
    >
      <span className="mr-4 flex-1">{message || children}</span>
      {action && <span>{action}</span>}
    </div>
  );

  return <div className={getPositionClass(anchorOrigin)}>{content}</div>;
};

export default Snackbar;
