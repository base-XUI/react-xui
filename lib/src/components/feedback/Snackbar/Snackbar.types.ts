import { ReactNode } from "react";

/**
 * Vertical position of the Snackbar
 */
export type SnackbarVerticalPosition = "top" | "bottom";

/**
 * Horizontal position of the Snackbar
 */
export type SnackbarHorizontalPosition = "left" | "center" | "right";

/**
 * Anchor origin for the Snackbar position
 */
export type SnackbarAnchorOrigin = {
  vertical: SnackbarVerticalPosition;
  horizontal: SnackbarHorizontalPosition;
};

export interface SnackbarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action component to display after the message
   */
  action?: ReactNode;

  /**
   * The message to display in the Snackbar
   */
  message?: string | ReactNode;

  /**
   * Children to render if no message is provided
   */
  children?: ReactNode;
};

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action component to display after the message
   */
  action?: ReactNode;

  /**
   * The message to display in the Snackbar
   */
  message?: string | ReactNode;

  /**
   * Children to render if no message is provided
   */
  children?: ReactNode;

  /**
   * The duration in milliseconds to auto-hide the Snackbar
   * @default 5000
   */
  autoHideDuration?: number;

  /**
   * The position of the Snackbar
   * @default  vertical: 'bottom', horizontal: 'left'
   */
  anchorOrigin?: SnackbarAnchorOrigin;

  /**
   * Callback fired when the Snackbar is closed
   */
  onClose?: () => void;

  /**
   * If true, the Snackbar is open
   */
  open: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
};
