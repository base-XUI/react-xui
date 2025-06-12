import {
  forwardRef,
  useState,
  useEffect,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  ChangeEvent,
  ReactElement,
  useCallback,
} from "react";
import {
  ELEMENT_TYPES,
  ElementType,
  Primitive,
  RadioChangeMetadata,
  RadioGroupProps,
  RadioProps,
} from "./RadioGroup.types";
import { cn } from "@/utils/cn";

const normalize = (val: Primitive): Primitive =>
  typeof val === "string" ? val.toLowerCase() : val;

const isSelected = (selectedValue: Primitive, val: Primitive): boolean => {
  if (selectedValue == null || val == null) return selectedValue === val;
  return String(selectedValue) === String(val);
};

const getElementType = (props: RadioProps): ElementType => {
  if ("control" in props && isValidElement(props.control)) {
    return ELEMENT_TYPES.FORM_CONTROL_LABEL;
  }
  if ("value" in props && props.value !== undefined) {
    return ELEMENT_TYPES.RADIO;
  }
  return ELEMENT_TYPES.OTHER;
};

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      id,
      defaultValue,
      value: externalValue,
      name: groupName = "default",
      row = false,
      sx,
      onChange,
      onValueChange,
    },
    ref,
  ) => {
    const containerClassName = cn(
      "flex flex-col items-start justify-center",
      row && "flex-row gap-4",
    );
    const normalizedDefaultValue: Primitive | undefined =
      defaultValue !== undefined ? normalize(defaultValue) : undefined;

    const isControlled = externalValue !== undefined && externalValue !== "";
    const [internalValue, setInternalValue] = useState<Primitive | undefined>(
      normalizedDefaultValue,
    );
    const currentValue: Primitive | undefined = isControlled
      ? externalValue !== undefined
        ? normalize(externalValue)
        : undefined
      : internalValue;

    useEffect(() => {
      if (!isControlled) {
        setInternalValue(normalizedDefaultValue);
      }
    }, [isControlled, normalizedDefaultValue]);

    const handleChange = useCallback(
      (val: Primitive) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.disabled) return;

        const normalizedVal = normalize(val);

        if (!isControlled) {
          setInternalValue(normalizedVal);
        }

        const metadata: RadioChangeMetadata = {
          id: e.target.id || `radio-${String(normalizedVal)}`,
          value: normalizedVal,
          name: groupName,
          checked: true,
        };

        onChange?.(e, normalizedVal, metadata);
        onValueChange?.(normalizedVal, metadata);
      },
      [isControlled, groupName, onChange, onValueChange],
    );

    const createRadioProps = useCallback(
      (value: Primitive) => ({
        name: groupName,
        value,
        checked: isSelected(currentValue, value),
        onChange: handleChange(value),
        key: `${groupName}-${String(value)}`,
      }),
      [groupName, currentValue, handleChange],
    );

    const processFormControlLabel = useCallback(
      (child: ReactElement, props: RadioProps) => {
        const { control, value: labelValue } = props;
        if (!isValidElement(control)) return;

        const value =
          labelValue ?? (control.props as { value: Primitive }).value;
        const clonedControl = cloneElement(control, createRadioProps(value));
        return cloneElement(child as ReactElement<RadioProps>, {
          ...props,
          control: clonedControl,
        });
      },
      [createRadioProps],
    );

    const processRadio = useCallback(
      (child: ReactElement, props: RadioProps): ReactElement => {
        return cloneElement(child, createRadioProps(props.value));
      },
      [createRadioProps],
    );

    const processChild = useCallback(
      (child: ReactNode): ReactNode => {
        if (!isValidElement(child)) return child;
        const props = child.props as RadioProps;
        const elementType = getElementType(props);

        if (props.children) {
          return cloneElement(
            child,
            props,
            Children.map(props.children, processChild),
          );
        }
        switch (elementType) {
          case ELEMENT_TYPES.FORM_CONTROL_LABEL:
            return processFormControlLabel(child, props);

          case ELEMENT_TYPES.RADIO:
            return processRadio(child, props);

          default:
            return child;
        }
      },
      [processFormControlLabel, processRadio],
    );

    return (
      <div id={id} ref={ref} style={sx} className={containerClassName}>
        {Children.map(children, processChild)}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
