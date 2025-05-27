/**
 * Customizable Checkbox Component
 *
 * Features:
 * - Multiple color themes and sizes
 * - Custom icons for all states
 * - Slot-based customization (MUI-style)
 * - Full accessibility support
 * - TypeScript ready
 */
import { forwardRef, isValidElement } from "react";
import { cn } from "@/utils/cn";
import { checkboxVariants } from "./variants";
import { CheckboxProps } from "./Checkbox.types";
import { Check, Minus } from "lucide-react";

// Validation helper
const validateIcon = (name: string, icon: unknown): boolean => {
  if (icon == null) return true;
  if (!isValidElement(icon)) {
    console.error(`Invalid "${name}" - only React elements allowed`, {
      received: typeof icon,
    });
    return false;
  }
  return true;
};

// Utility helpers
const generateId = () => `checkbox-${Math.random().toString(36).slice(2, 9)}`;
const getState = (checked: boolean, indeterminate: boolean) =>
  indeterminate ? "indeterminate" : checked ? "checked" : "unchecked";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    // Core props
    id,
    name,
    value,
    checked = false,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    required = false,
    onChange,

    // Styling
    className,
    color = "primary",
    size = "medium",

    // Icons
    icon,
    checkedIcon = <Check />,
    indeterminateIcon = <Minus />,

    // Customization
    slots = {},
    slotProps = {},

    ...rest
  } = props;

  // Validate icons
  const isValid = [
    validateIcon("icon", icon),
    validateIcon("checkedIcon", checkedIcon),
    validateIcon("indeterminateIcon", indeterminateIcon),
  ].every(Boolean);

  if (!isValid) return <div className="text-red-600">error *</div>;

  // Component state
  const checkboxId = id || generateId();
  const state = getState(checked || defaultChecked, indeterminate);

  // Select current icon
  const currentIcon =
    state === "indeterminate"
      ? indeterminateIcon
      : state === "checked"
        ? checkedIcon
        : icon;

  // Resolve slot components
  const RootComponent = slots.root || "span";
  const InputComponent = slots.input || "input";

  // Build classes
  const rootClasses = cn(
    checkboxVariants({ color, size, state }),
    disabled && "cursor-not-allowed opacity-50",
    required && !checked && !indeterminate && "border-error",
    className,
    slotProps.root?.className,
  );

  const inputClasses = cn(
    "absolute inset-0 opacity-0",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    slotProps.input?.className,
  );

  return (
    <RootComponent
      {...slotProps.root}
      className={rootClasses}
      data-state={state}
      data-disabled={disabled}
      data-testid="checkbox-span-holder"
    >
      <InputComponent
        {...slotProps.input}
        {...rest}
        ref={ref}
        id={checkboxId}
        type="checkbox"
        name={slotProps.input?.name ?? name}
        value={value}
        checked={checked || defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className={inputClasses}
        aria-checked={indeterminate ? "mixed" : checked}
        data-testid="checkbox-input"
      />
      {currentIcon}
    </RootComponent>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
