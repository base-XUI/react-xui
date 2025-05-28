import { cn } from "@/utils/cn";
import { SnackbarContentProps } from "./Snackbar.types";

/**
 * SnackbarContent component for displaying the content of a Snackbar
 */

export const SnackbarContent: React.FC<SnackbarContentProps> = ({
  action,
  message,
  children,
  sx,
}) => {
  // Get the icon based on severity or custom icon

  return (
    <div
      className={cn("flex items-center rounded-md p-4")}
      style={{ ...sx }}
      role="alert"
    >
      {/* Content */}
      <div className="flex-grow">{message || children}</div>

      {/* Action */}
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
};

SnackbarContent.displayName = "SnackbarContent";
