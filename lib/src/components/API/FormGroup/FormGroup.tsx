import { forwardRef } from "react";
import type { FormGroupProps } from "./FormGroup.types";
import { cn } from "@/utils/cn";

/**
 * @file
 * Implementation of the FormGroup component.
 * FormGroup is used to wrap form controls like Checkbox and Switch.
 * It provides a consistent layout and supports both vertical and horizontal alignment.
 *
 * @example
 * <FormGroup row>
 *   <Checkbox label="Option 1" />
 *   <Checkbox label="Option 2" />
 * </FormGroup>
 */

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
        style={sx} // Support inline styles via sx prop
        data-testid="styled-element"
      >
        {children}
      </div>
    );
  },
);

FormGroup.displayName = "FormGroup";

export { FormGroup };
