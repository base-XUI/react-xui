// Checkbox.tsx
import { ElementType, useState } from "react";
import { cn } from "@/utils/cn";
import { checkboxVariants } from "./variants";
import { type CheckboxProps } from "./Checkbox.types";
import { CheckmarkIcon } from "@/icons";

const Checkbox = <C extends ElementType = "input">({
  id,
  className,
  color,
  size,
  checked = false,
  indeterminate = false,
  disabled = false,
  checkedIcon,
  icon,
  indeterminateIcon,
  required = false,
  onChange,
  ...rest
}: CheckboxProps<C>) => {
  function useId() {
    return useState(
      () => `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    )[0];
  }
  const inputId = id || useId();
  return (
    <label
      data-testid="checkbox-label"
      htmlFor={inputId}
      className="flex cursor-pointer items-center gap-2"
    >
      <input
        id={inputId}
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        required={required}
        {...rest}
        data-testid="checkbox-input"
      />
      <div
        className={cn(
          checkboxVariants({
            color,
            size,
            state: checked
              ? "checked"
              : indeterminate
                ? "indeterminate"
                : "unchecked",
          }),
          className,
          "box-content flex items-center shadow-sm",
          disabled && "cursor-not-allowed opacity-50",
          required && "border-error border",
        )}
        role="checkbox"
        data-testid="div-role-checkbox"
        data-state={
          checked ? "checked" : indeterminate ? "indeterminate" : "unchecked"
        }
        data-disabled={disabled}
        data-required={required}
        data-variant={color}
        data-size={size}
      >
        {/* Icons */}
        {indeterminate ? (
          <span className="text-sm-1.5 font-bold">
            {indeterminateIcon ? indeterminateIcon : "—"}
          </span>
        ) : checked ? (
          checkedIcon ? (
            checkedIcon
          ) : (
            <CheckmarkIcon />
          )
        ) : icon ? (
          icon
        ) : null}
      </div>

      {required && <span className="text-error">*</span>}
    </label>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
