import { cn } from "@/utils/cn";
import { SnackbarContentProps } from "./Snackbar.types";

export const SnackbarContent: React.FC<SnackbarContentProps> = ({
  action,
  message,
  children,
  ...restProps
}) => {
  return (
    <div
      className={cn(
        "border-muted flex min-h-[64px] w-full items-center rounded-md border border-solid p-[16px] shadow-lg",
      )}
      role="alert"
      {...restProps}
    >
      <div className="flex-grow">{message || children}</div>

      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
};

SnackbarContent.displayName = "SnackbarContent";
