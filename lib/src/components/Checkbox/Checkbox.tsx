import { forwardRef, isValidElement, useId, useState } from "react";
import { cn } from "@/utils/cn";
import { checkboxVariants } from "./variants";
import { CheckboxProps } from "./Checkbox.types";
import { Check, Minus } from "lucide-react";

const validateReactElement = (propName: string, element: unknown): boolean => {
  if (element == null) return true;
  if (!isValidElement(element)) {
    console.error(
      `Invalid "${propName}" prop provided to Checkbox. Expected a React element or null/undefined, but received: ${typeof element}.`,
    );
    return false;
  }
  return true;
};

const getCheckboxState = (
  isChecked: boolean,
  isIndeterminate: boolean,
): "checked" | "unchecked" | "indeterminate" => {
  if (isIndeterminate) {
    return "indeterminate";
  }
  return isChecked ? "checked" : "unchecked";
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    id,
    name,
    value,
    checked: externalChecked = undefined,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    required = false,
    onChange: externalOnChange = undefined,
    className,
    color = "primary",
    size = "medium",
    icon = null,
    checkedIcon = <Check />,
    indeterminateIcon = <Minus />,
    slots = {},
    slotProps = {},
    ...rest
  } = props;

  const generatedId = useId();
  const checkboxId = id || generatedId;

  const areIconsValid = [
    validateReactElement("icon", icon),
    validateReactElement("checkedIcon", checkedIcon),
    validateReactElement("indeterminateIcon", indeterminateIcon),
  ].every(Boolean);

  if (!areIconsValid) {
    return (
      <div
        data-testid="icon-error-msg"
        className="text-sm font-medium text-red-600"
        role="alert"
        aria-live="polite"
      >
        Invalid Icon
      </div>
    );
  }

  const isControlled =
    externalChecked !== undefined && externalOnChange !== undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked = isControlled ? externalChecked : internalChecked;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      externalOnChange?.(e);
    } else {
      setInternalChecked(e.target.checked);
    }
  };

  const state = getCheckboxState(isChecked, indeterminate);

  const currentIcon = indeterminate
    ? indeterminateIcon
    : isChecked
      ? checkedIcon
      : icon;

  const RootComponent = slots.root || "label";
  const InputComponent = slots.input || "input";

  const rootClasses = cn(
    "inline-flex items-center justify-center transition-all relative",
    checkboxVariants({ color, size, state }),
    {
      "border border-gray-300": !isChecked,
      "cursor-not-allowed opacity-50": disabled,
      "border-error border": required && !isChecked && !indeterminate,
    },
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
        checked={isChecked}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        className={inputClasses}
        aria-checked={indeterminate ? "mixed" : isChecked}
        data-testid="checkbox-input"
      />
      {currentIcon}
    </RootComponent>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
