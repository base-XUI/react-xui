import { forwardRef } from "react";
import type { FormGroupProps } from "./FormGroup.types";
import { cn } from "@/utils/cn";

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, row = false, className, sx, animation = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start justify-center gap-2",
          animation &&
            "transition-all transition-discrete duration-800 ease-in-out",
          row && "flex-row gap-4",
          className,
        )}
        style={sx}
        data-testid="styled-element"
      >
        {children}
      </div>
    );
  },
);

FormGroup.displayName = "FormGroup";

export { FormGroup };
