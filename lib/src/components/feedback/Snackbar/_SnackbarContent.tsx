import { cn } from "@/utils/cn";
import { SnackbarContentProps } from "./Snackbar.types";

export const SnackbarContent: React.FC<SnackbarContentProps> = ({
  action,
  message,
  children,
}) => {
  return (
    <div className={cn("flex w-full items-center rounded-md p-4")} role="alert">
      <div className="flex-grow">{message || children}</div>

      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
};

SnackbarContent.displayName = "SnackbarContent";
