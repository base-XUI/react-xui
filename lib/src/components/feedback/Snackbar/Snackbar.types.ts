import { ReactNode } from "react";

export type SnackbarOrigin = {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
};

export interface SnackbarProps {
  open: boolean;
  autoHideDuration?: number;
  message?: ReactNode;
  action?: ReactNode;
  anchorOrigin?: SnackbarOrigin;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}
