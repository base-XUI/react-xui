import {
  isValidElement,
  useEffect,
  useRef,
  useId,
  useState,
  ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { radioVariants } from "./variants";
import { Circle } from "lucide-react";
import { RadioBaseProps, Primitive } from "./Radio.types";

const groupState: Record<string, Primitive> = {};
const groupListeners: Record<string, Array<() => void>> = {};
const parentIdMap = new WeakMap<HTMLElement, string>();
let parentIdCounter = 0;

const findClosestGroup = (element: HTMLElement | null) =>
  element?.closest("div, fieldset, form, section") ?? null;

function getGroupKey(element: HTMLElement | null, name: string): string {
  const closestParent = findClosestGroup(element) as HTMLElement;
  if (!closestParent) return name; // Fallback to name for global scope

  if (!parentIdMap.has(closestParent)) {
    parentIdMap.set(closestParent, `radio-group-${parentIdCounter++}`);
  }
  const parentId = parentIdMap.get(closestParent)!;
  return `${parentId}_${name}`;
}

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

  const isControlled = controlledChecked !== undefined;
  const finalChecked = isControlled ? controlledChecked : internalChecked;

  // Effect to handle ref forwarding for the root element via slotProps
  useEffect(() => {
    if (rootSlotRef) {
      if (typeof rootSlotRef === "function") {
        rootSlotRef(rootRef.current);
      } else {
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

    groupListeners[groupKey] = [
      ...(groupListeners[groupKey] || []),
      updateState,
    ];

    if (defaultChecked && groupState[groupKey] === undefined) {
      groupState[groupKey] = value;
    }
    updateState();

    return () => {
      groupListeners[groupKey] = groupListeners[groupKey]?.filter(
        (fn) => fn !== updateState,
      );
    };
  }, [name, value, isControlled, defaultChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      const groupKey = getGroupKey(rootRef.current, name);
      groupState[groupKey] = value as Primitive;
      groupListeners[groupKey]?.forEach((listener) => listener());
    }
    onChange?.(e);
  };

  const validateIcon = (iconName: string, iconElement: ReactNode) => {
    if (!iconElement || isValidElement(iconElement)) return true;
    console.error(`Invalid "${iconName}" - only React elements are allowed.`);
    return false;
  };

  if (
    !validateIcon("icon", icon) ||
    !validateIcon("checkedIcon", checkedIcon)
  ) {
    return <div className="text-red-600">Error: Invalid Icon</div>;
  }

  const state = finalChecked ? "checked" : "unchecked";
  const RootComponent = slots.root || "span";
  const InputComponent = slots.input || "input";

  return (
    <RootComponent
      {...rootSlotProps}
      ref={rootRef}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full p-0.5",
        radioVariants({ color, size, state }),
        !finalChecked && "border border-gray-300",
        disabled && "cursor-not-allowed opacity-50",
        required && !finalChecked && "border-error",
        className,
        rootSlotProps.className,
      )}
      style={sx}
      data-state={state}
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
        className={cn(
          "absolute inset-0 cursor-pointer opacity-0",
          disabled && "pointer-events-none",
          inputSlotProps.className,
        )}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {finalChecked ? checkedIcon : icon}
      </span>
    </RootComponent>
  );
};

Radio.displayName = "Radio";
