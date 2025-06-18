/**
 * A customizable Checkbox component with support for checked, unchecked, and indeterminate states.
 *
 * Features:
 * - Customizable color and size variants
 * - Controlled and uncontrolled usage
 * - Custom icons for all states
 * - Accessibility compliant
 * - Type-safe props
 * - Slot-based styling system
 * - Input validation
 *
 * @component
 * @param {CheckboxBaseProps} props - Component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} A customizable checkbox element
 */
import { forwardRef, isValidElement } from "react";
import { cn } from "@/utils/cn";
import { checkboxVariants } from "./variants";
import { type CheckboxBaseProps } from "./Checkbox.types";

import { Check, Minus } from "lucide-react";

const Checkbox = forwardRef<HTMLInputElement, CheckboxBaseProps>(
  (
    {
      id,
      className,
      name,
      value,
      defaultChecked = false,
      color = "primary",
      size = "medium",
      checked = false,
      indeterminate = false,
      disabled = false,
      checkedIcon = <Check />,
      icon,
      indeterminateIcon = <Minus />,
      required = false,
      onChange,
      slotProps = {},
      ...rest
    },
    ref,
  ) => {
    /**
     * Validates if the provided icon is a valid React element.
     * Returns an error message if the icon is invalid.
     *
     * @param {string} iconName - Name of the icon prop (for error messaging)
     * @param {unknown} iconValue - The icon value to validate
     * @returns {JSX.Element|null} Error message or null if valid
     */
    const validateIcon = (iconName: string, iconValue: unknown) => {
      if (iconValue && !isValidElement(iconValue)) {
        return (
          <div
            className="mb-1 rounded-md bg-red-50 p-3 text-sm text-red-500"
            data-testid={`invalid-${iconName}-error`}
          >
            Invalid icon provided for (
            <code className="text-md font-mono text-red-600">{iconName}</code>)
            . Only React components wrapped in TSX (e.g., (
            <code className="text-md font-mono text-red-600">{`<${iconName.toUpperCase()}/>`}</code>
            ) are allowed.
          </div>
        );
      }
      return null;
    };

    // Validate all icon props early in render
    const iconError = validateIcon("icon", icon);
    const checkedIconError = validateIcon("checkedIcon", checkedIcon);
    const indeterminateIconError = validateIcon(
      "indeterminateIcon",
      indeterminateIcon,
    );

    // Return the first error encountered during icon validation
    if (iconError) return iconError;
    if (checkedIconError) return checkedIconError;
    if (indeterminateIconError) return indeterminateIconError;

    // Generate a unique ID if none provided for accessibility
    const generatedId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const checkboxId = id || generatedId;

    // Determine the current visual state of the checkbox
    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";

    // Merge root slot props with default and custom className
    const rootProps = {
      ...slotProps.root,
      className: cn(
        "inline-flex items-center justify-center transition-all relative",
        checkboxVariants({ color, size, state }), // Apply variant styles
        !checked && "border border-gray-300", // Default border when unchecked
        disabled && "cursor-not-allowed opacity-50", // Disabled state styles
        required && !checked && !indeterminate && "border-error border", // Required validation
        className, // Custom className from props
        slotProps.root?.className, // Custom className from slotProps
      ),
    };

    // Merge input slot props with default styles
    const inputPropsMerged = {
      ...slotProps.input,
      className: cn(
        "absolute inset-0 cursor-pointer opacity-0", // Hide native input visually but keep accessible
        disabled && "cursor-not-allowed", // Disabled state
        slotProps.input?.className, // Custom input className
      ),
    };

    // Resolve name prop with fallbacks (handles empty string case)
    const resolvedName =
      name === ""
        ? (slotProps?.input?.name ?? undefined)
        : (name ?? slotProps?.input?.name);

    // Determine which icon to display based on current state
    const displayIcon = indeterminate
      ? indeterminateIcon
      : checked || defaultChecked
        ? checkedIcon
        : icon;

    return (
      <span {...rootProps} data-testid="checkbox-span-holder">
        <input
          data-testid="checkbox-input"
          id={checkboxId}
          type="checkbox"
          ref={ref}
          name={resolvedName}
          value={value}
          checked={checked || defaultChecked}
          disabled={disabled}
          onChange={onChange}
          required={required}
          aria-checked={indeterminate ? "mixed" : checked} // ARIA compliance
          {...inputPropsMerged}
          {...rest} // Spread any additional props
        />
        {/* Visual representation using the appropriate icon */}
        {displayIcon}
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox"; // Required for DevTools and testing
export { Checkbox };
