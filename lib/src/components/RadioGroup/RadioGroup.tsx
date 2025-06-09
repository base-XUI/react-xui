import {
  forwardRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  ChangeEvent,
  ReactElement,
} from "react";
import {
  Primitive,
  RadioChangeMetadata,
  RadioGroupProps,
} from "./RadioGroup.types";
import { cn } from "@/utils/cn";

interface RadioProps extends RadioGroupProps {
  control?: ReactElement<RadioProps>;
  checked?: boolean;
}

function isFormControlLabelProps(
  props: Record<string, any>,
): props is RadioProps {
  return "control" in props && isValidElement(props.control);
}

function isRadioProps(props: Record<string, any>): props is RadioGroupProps {
  return "value" in props && typeof props.value !== "undefined";
}

export function isSelected(selectedValue: Primitive, val: Primitive): boolean {
  if (selectedValue == undefined || val == undefined) {
    return selectedValue === val;
  }
  return String(selectedValue).toLowerCase() === String(val).toLowerCase();
}

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
    const [internalValues, setInternalValues] = useState<
      Record<string, Primitive>
    >({});

    const getCurrentValue = (fieldName: string): Primitive => {
      return internalValues[fieldName] ?? externalValue ?? defaultValue;
    };

    const handleChange =
      (val: Primitive, fieldName: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.disabled) return;
        const finalName = String(fieldName);
        const metadata: RadioChangeMetadata = {
          id: `radio-${val}`,
          value: val,
          name: finalName,
          checked: true,
        };
        setInternalValues((prev) => ({
          ...prev,
          [finalName]: val,
        }));
        onChange?.(e, val, metadata);
        onValueChange?.(val, metadata);
      };

    const renderChild = (child: ReactNode): ReactNode => {
      if (!isValidElement(child)) return child;

      const props = child.props as Record<string, any>;

      if (isFormControlLabelProps(props)) {
        const { control, value: labelValue } = props;
        if (!isValidElement(control)) return child;
        const radioProps = control.props;
        const finalValue = labelValue ?? radioProps.value;
        const finalName = String(radioProps.name || groupName);
        const isChecked = isSelected(getCurrentValue(finalName), finalValue);
        const clonedControl = cloneElement(control, {
          name: finalName,
          value: finalValue,
          checked: isChecked,
          onChange: handleChange(finalValue, finalName),
        });

        return cloneElement(child as ReactElement<RadioProps>, {
          control: clonedControl,
        });
      }
      if (isRadioProps(props)) {
        const { name = groupName, value } = props;
        const finalName = String(name);
        const isChecked = isSelected(getCurrentValue(finalName), value);
        return cloneElement(child as ReactElement<RadioProps>, {
          name: finalName,
          value,
          checked: isChecked,
          onChange: handleChange(value, finalName),
        });
      }
      return child;
    };
    return (
      <div
        id={id}
        ref={ref}
        style={sx}
        className={cn(
          "flex flex-col items-start justify-center",
          row && "flex-row gap-4",
        )}
      >
        {Children.map(children, renderChild)}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
