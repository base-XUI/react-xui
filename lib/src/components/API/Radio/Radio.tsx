import { forwardRef, isValidElement } from "react";
import { cn } from "@/utils/cn"; // Utility for conditional class names
import { radioVariants } from "./variants"; // Tailwind variants based on color/size/state
import { RadioProps } from "./Radio.types"; // TypeScript interface defining all props
import { Circle } from "lucide-react"; // Default icon when checked

/**
 * Validates that the provided icon is a valid React element.
 * Logs an error if invalid to help developers catch mistakes early.
 */
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

/**
 * Generates a unique ID for the radio input if none is provided.
 */
const generateId = () => `radio-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Determines the visual state of the radio button (checked/unchecked).
 */
const getState = (checked: boolean) => (checked ? "checked" : "unchecked");

/**
 * A customizable and accessible radio button component.
 *
 * Features:
 * - Fully controlled/uncontrolled behavior via `checked` or `defaultChecked`
 * - Custom styling with variants and slot-based rendering
 * - Supports custom icons and validation
 * - Accessible with aria attributes and keyboard support
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    // Core Props
    id, // Optional ID for accessibility and form handling
    name, // HTML name attribute
    value, // Value passed in form submission
    checked = false, // Controlled checked state
    defaultChecked = false, // Uncontrolled initial state
    disabled = false, // Disables interaction
    required = false, // Makes field mandatory
    onChange, // Change handler

    // Styling Props
    className, // Additional root class names
    color = "primary", // Color variant (e.g., primary, secondary)
    size = "medium", // Size variant (e.g., small, medium)

    // Icon Props
    icon = undefined, // Optional un-checked icon
    checkedIcon = <Circle className="h-full w-full" />, // Checked icon (Lucide)

    // Slot API for customization
    slots = {}, // Override root/input components
    slotProps = {}, // Pass additional props to slots

    ...rest // Remaining props passed to input
  } = props;

  // Validate icon inputs
  const isValid = [
    validateIcon("icon", icon),
    validateIcon("checkedIcon", checkedIcon),
  ].every(Boolean);

  if (!isValid)
    return (
      <div data-testid="icon-error-msg" className="text-red-600">
        error *
      </div>
    );

  // Generate unique ID if not provided
  const radioId = id || generateId();

  // Determine current state for styling
  const state = getState(checked || defaultChecked);

  // Select appropriate icon based on state
  const currentIcon = state === "checked" ? checkedIcon : icon;

  // Resolve components for slots
  const RootComponent = slots.root || "span";
  const InputComponent = slots.input || "input";

  // Apply merged classes using `cn` utility
  const rootClasses = {
    ...slotProps.root,
    className: cn(
      "relative inline-flex items-center justify-center rounded-full p-0.5 shrink-0",
      radioVariants({ color, size, state }),
      !checked && "border border-gray-300",
      disabled && "cursor-not-allowed opacity-50",
      required && !checked && "border-error",
      className,
      slotProps.root?.className,
    ),
  };

  const inputClasses = {
    ...slotProps.input,
    className: cn(
      "absolute inset-0 opacity-0",
      disabled ? "pointer-events-none" : "cursor-pointer",
      slotProps.input?.className,
    ),
  };

  return (
    <RootComponent
      {...rootClasses}
      data-testid="root-component"
      data-state={state}
    >
      {/* Actual input element */}
      <InputComponent
        {...inputClasses}
        {...rest}
        ref={ref}
        id={radioId}
        type="radio"
        name={slotProps.input?.name ?? name}
        value={value}
        checked={checked || defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        aria-checked={checked}
      />

      {/* Centered icon inside the radio circle */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {currentIcon}
      </span>

      {/* Required indicator asterisk shown only if not checked */}
      {required && !checked && (
        <span
          aria-hidden="true"
          className="absolute inset-x-5 -inset-y-0 text-xs font-bold text-red-500"
        >
          *
        </span>
      )}
    </RootComponent>
  );
});

Radio.displayName = "Radio";

export { Radio };
