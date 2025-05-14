import { ReactNode, CSSProperties } from 'react';

/**
 * Vertical position of the Snackbar
 */
export type SnackbarVerticalPosition = 'top' | 'bottom';

/**
 * Horizontal position of the Snackbar
 */
export type SnackbarHorizontalPosition = 'left' | 'center' | 'right';

/**
 * Anchor origin for the Snackbar position
 */
export interface SnackbarAnchorOrigin {
  vertical: SnackbarVerticalPosition;
  horizontal: SnackbarHorizontalPosition;
}

/**
 * Severity levels for the Snackbar
 */
export type SnackbarSeverity = 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success';

/**
 * Visual variants for the Snackbar
 */
export type SnackbarVariant = 'filled' | 'outlined';

/**
 * Transition effects for the Snackbar
 */
export type SnackbarTransition = 'fade' | 'slide' | 'grow';

/**
 * Props for the Snackbar component
 */
export interface SnackbarProps {
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
   * Custom inline styles
   */
  style?: CSSProperties;
  
  /**
   * Callback fired when the Snackbar is closed
   */
  onClose?: () => void;
  
  /**
   * If true, the Snackbar is open
   */
  open: boolean;
  
  /**
   * The severity of the Snackbar
   * @default 'primary'
   */
  severity?: SnackbarSeverity;
  
  /**
   * The variant of the Snackbar
   * @default 'filled'
   */
  variant?: SnackbarVariant;
  
  /**
   * If true, the close icon will be displayed
   * @default true
   */
  withCloseIcon?: boolean;
  
  /**
   * Custom close icon
   */
  closeIcon?: ReactNode;
  
  /**
   * Custom icon to override the default severity icon
   */
  customIcon?: ReactNode;
  
  /**
   * The transition effect
   * @default 'fade'
   */
  transition?: SnackbarTransition;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}
