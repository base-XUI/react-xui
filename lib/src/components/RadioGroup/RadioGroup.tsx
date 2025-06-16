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

const isSelected = (selectedValue: Primitive, val: Primitive): boolean =>
  String(normalize(selectedValue)) === String(normalize(val));

const getElementType = ({ control, value }: RadioProps): ElementType =>
  isValidElement(control)
    ? ELEMENT_TYPES.FORM_CONTROL_LABEL
    : value !== undefined
      ? ELEMENT_TYPES.RADIO
      : ELEMENT_TYPES.OTHER;

const isEmptyPrimitive = (val?: Primitive): boolean =>
  val == null || val === "";

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      id,
      defaultValue,
      value: externalValue,
      name: groupName = "default-radio-group",
      row = false,
      sx,
      onChange,
      onValueChange,
    },
    ref,
  ) => {
    const getInitialValue = () => {
      if (!isEmptyPrimitive(defaultValue)) {
        return normalize(defaultValue!);
      }

      let valueFromChildren: Primitive | undefined;
      const stack: ReactNode[] = Children.toArray(children).reverse();

      while (stack.length > 0) {
        const child = stack.pop();
        if (!isValidElement(child)) continue;

        const props = child.props as RadioProps;
        const elementType = getElementType(props);
        let foundValue: Primitive | undefined;

        if (
          elementType === ELEMENT_TYPES.RADIO &&
          props.defaultChecked &&
          props.value !== undefined
        ) {
          foundValue = props.value;
        } else if (
          elementType === ELEMENT_TYPES.FORM_CONTROL_LABEL &&
          isValidElement(props.control)
        ) {
          const controlProps = props.control.props as RadioProps;
          if (
            (props.defaultChecked || controlProps.defaultChecked) &&
            controlProps.value !== undefined
          ) {
            foundValue = controlProps.value;
          }
        }

        if (foundValue !== undefined) {
          valueFromChildren = foundValue;
          break;
        }

        if (props.children) {
          Children.toArray(props.children)
            .reverse()
            .forEach((nestedChild) => stack.push(nestedChild));
        }
      }

      return normalize(valueFromChildren ?? "");
    };

    const isControlled = !isEmptyPrimitive(externalValue);
    const [internalValue, setInternalValue] =
      useState<Primitive>(getInitialValue());

    const currentValue = isControlled
      ? normalize(externalValue!)
      : internalValue;

    useEffect(() => {
      if (!isControlled) {
        setInternalValue(getInitialValue());
      }
    }, [defaultValue, isControlled]);

    const handleChange =
      (val: Primitive) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.disabled) return;

        const normalizedVal = normalize(val);
        const metadata: RadioChangeMetadata = {
          id: e.target.id || `radio-${String(normalizedVal)}`,
          value: normalizedVal,
          name: groupName,
          checked: true,
        };
        if (!isControlled) {
          setInternalValue(normalizedVal);
        }
        onChange?.(e, normalizedVal, metadata);
        onValueChange?.(normalizedVal, metadata);
      };

    const mapChild = (child: ReactNode): ReactNode => {
      if (!isValidElement(child)) return child;

      const props = child.props as RadioProps;
      const elementType = getElementType(props);

      switch (elementType) {
        case ELEMENT_TYPES.RADIO:
          if (props.value !== undefined) {
            return cloneElement(child as ReactElement<RadioProps>, {
              name: groupName,
              checked: isSelected(currentValue, props.value),
              onChange: handleChange(props.value),
            });
          }
          break;

        case ELEMENT_TYPES.FORM_CONTROL_LABEL:
          if (isValidElement(props.control)) {
            const controlProps = props.control.props as RadioProps;
            const controlValue = props.value ?? controlProps.value;
            if (controlValue !== undefined) {
              const newControl = cloneElement(
                props.control as ReactElement<RadioProps>,
                {
                  name: groupName,
                  checked: isSelected(currentValue, controlValue),
                  onChange: handleChange(controlValue),
                },
              );
              return cloneElement(child as ReactElement<RadioProps>, {
                control: newControl,
              });
            }
          }
          break;

        default:
          if (props.children) {
            return cloneElement(
              child,
              props,
              Children.map(props.children, mapChild),
            );
          }
      }

      return child;
    };

    const containerClassName = cn(
      "flex flex-col items-start justify-center",
      row && "flex-row gap-x-3",
    );

    return (
      <div id={id} ref={ref} style={sx} className={containerClassName}>
        {Children.map(children, mapChild)}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
