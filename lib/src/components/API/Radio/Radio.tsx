import {
  isValidElement,
  useEffect,
  useRef,
  useId,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/utils/cn";
import { radioVariants } from "./variants";
import { Circle } from "lucide-react";
import { RadioBaseProps, Primitive } from "./Radio.types";

const groupState: Record<string, Primitive> = {};
const groupListeners: Record<string, Set<() => void>> = {};
const parentIdMap = new WeakMap<HTMLElement, string>();
let parentIdCounter = 0;

const findClosestGroup = (element: HTMLElement | null): HTMLElement | null => {
  if (!element) return null;
  return element.closest(
    "[is-separated='true'], div, section, article",
  ) as HTMLElement;
};

function getGroupKey(element: HTMLElement | null, name: string): string {
  const closestParent = findClosestGroup(element);
  if (!closestParent) return name;

  if (!parentIdMap.has(closestParent)) {
    parentIdMap.set(closestParent, `radio-group-${parentIdCounter++}`);
  }
  const parentId = parentIdMap.get(closestParent)!;
  return `${parentId}_${name}`;
}

// تحسين الـ cleanup function
const cleanupGroupListeners = () => {
  Object.keys(groupListeners).forEach((key) => {
    if (groupListeners[key].size === 0) {
      delete groupListeners[key];
      delete groupState[key];
    }
  });
};

export const Radio = (props: RadioBaseProps) => {
  const {
    className,
    sx,
    color,
    size,
    icon,
    checkedIcon = <Circle className="h-full w-full" color="#fff" />,
    slots = {},
    slotProps = {},
    id,
    name = "default-radio-name",
    value,
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    disabled,
    required,
    ...rest
  } = props;

  const rootRef = useRef<HTMLElement>(null);
  const autoId = useId();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const { ref: inputSlotRef, ...inputSlotProps } = slotProps.input || {};
  const { ref: rootSlotRef, ...rootSlotProps } = slotProps.root || {};

  const isControlled = useMemo(
    () => controlledChecked !== undefined,
    [controlledChecked],
  );

  const finalChecked = isControlled ? controlledChecked : internalChecked;

  const validateIcon = useCallback(
    (iconName: string, iconElement: ReactNode): boolean => {
      if (iconElement === undefined || iconElement === null) return true;
      if (typeof iconElement === "string" && iconElement.trim() === "") {
        console.error(`Invalid "${iconName}" - empty strings are not allowed.`);
        return false;
      }
      if (
        !isValidElement(iconElement) &&
        iconElement !== null &&
        iconElement !== undefined
      ) {
        console.error(
          `Invalid "${iconName}" - only React elements are allowed.`,
        );
        return false;
      }
      return true;
    },
    [],
  );

  useEffect(() => {
    if (rootSlotRef) {
      if (typeof rootSlotRef === "function") {
        rootSlotRef(rootRef.current);
      } else if (rootSlotRef && "current" in rootSlotRef) {
        rootSlotRef.current = rootRef.current;
      }
    }
  }, [rootSlotRef]);

  useEffect(() => {
    if (value === undefined || isControlled) return;

    const groupKey = getGroupKey(rootRef.current, name);

    const updateState = () => {
      setInternalChecked(groupState[groupKey] === value);
    };
    if (!groupListeners[groupKey]) {
      groupListeners[groupKey] = new Set();
    }
    groupListeners[groupKey].add(updateState);
    if (defaultChecked && groupState[groupKey] === undefined) {
      groupState[groupKey] = value;
    }
    updateState();
    return () => {
      groupListeners[groupKey]?.delete(updateState);
      if (groupListeners[groupKey]?.size === 0) {
        cleanupGroupListeners();
      }
    };
  }, [name, value, isControlled, defaultChecked]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) {
        const groupKey = getGroupKey(rootRef.current, name);
        groupState[groupKey] = value as Primitive;

        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(() => {
            groupListeners[groupKey]?.forEach((listener) => listener());
          });
        } else {
          groupListeners[groupKey]?.forEach((listener) => listener());
        }
      }
      onChange?.(e);
    },
    [disabled, isControlled, name, value, onChange],
  );

  const iconValidationResult = useMemo(() => {
    const iconValid = validateIcon("icon", icon);
    const checkedIconValid = validateIcon("checkedIcon", checkedIcon);
    return { iconValid, checkedIconValid };
  }, [icon, checkedIcon, validateIcon]);

  if (
    !iconValidationResult.iconValid ||
    !iconValidationResult.checkedIconValid
  ) {
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

  const state = finalChecked ? "checked" : "unchecked";
  const RootComponent = slots.root || "span";
  const InputComponent = slots.input || "input";

  const rootClassName = useMemo(
    () =>
      cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full p-0.5 transition-all duration-200",
        radioVariants({ color, size, state }),
        !finalChecked && "border border-gray-300",
        disabled && "cursor-not-allowed opacity-50",
        required && !finalChecked && "border-error",
        className,
        rootSlotProps.className,
      ),
    [
      color,
      size,
      state,
      finalChecked,
      disabled,
      required,
      className,
      rootSlotProps.className,
    ],
  );

  const inputClassName = useMemo(
    () =>
      cn(
        "absolute inset-0 cursor-pointer opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        disabled && "pointer-events-none cursor-not-allowed",
        inputSlotProps.className,
      ),
    [disabled, inputSlotProps.className],
  );

  return (
    <RootComponent
      {...rootSlotProps}
      ref={rootRef}
      className={rootClassName}
      style={sx}
      data-state={state}
      data-disabled={disabled || undefined}
      aria-checked={finalChecked}
      aria-disabled={disabled}
      role={RootComponent === "span" ? "radio" : undefined}
    >
      <InputComponent
        {...rest}
        {...inputSlotProps}
        ref={inputSlotRef}
        type="radio"
        id={id ?? autoId}
        name={name}
        value={value}
        checked={finalChecked}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        className={inputClassName}
        aria-describedby={
          required && !finalChecked ? `${id ?? autoId}-error` : undefined
        }
      />
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200"
        aria-hidden="true"
      >
        {finalChecked ? checkedIcon : icon}
      </span>
    </RootComponent>
  );
};

Radio.displayName = "Radio";
