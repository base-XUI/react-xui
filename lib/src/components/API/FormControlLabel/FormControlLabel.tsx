import { forwardRef, cloneElement } from "react";
import { cn } from "@/utils/cn";
import {
  ALLOWED_COMPONENT_NAMES,
  VALID_INPUT_TYPES,
  type FormControlLabelProps,
} from "./FormControlLabel.types";
import { labelPlacementClasses } from "./variants";
import { validateControl } from "./validateControl";

const FormControlLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(
  (
    {
      control,
      label,
      labelPlacement = "end",
      className,
      defaultChecked,
      disabled,
      required,
      inputRef,
      value,
      id,
      onChange,
      ...rest
    },
    ref,
  ) => {
    if (
      !validateControl(control, {
        validTypes: VALID_INPUT_TYPES,
        allowedNames: ALLOWED_COMPONENT_NAMES,
        validExample:
          "<FormControlLabel control={<Checkbox />} label='Label Text' />",
        componentName: "FormControlLabel",
      })
    ) {
      return <span className="text-error">Syntax error *</span>;
    }

    const formControlLabelClassName = cn(
      "inline-flex cursor-pointer items-center justify-start gap-2 p-2 select-none",
      labelPlacementClasses[labelPlacement],
      disabled && "cursor-not-allowed opacity-50",
      className,
    );

    const renderLabel = () => {
      if (!label) return;
      return (
        <span className="select-none">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      );
    };

    const controlWithProps = cloneElement(control, {
      disabled: control.props.disabled || disabled,
      value: value ?? control.props.value,
      defaultChecked: defaultChecked ?? control.props.defaultChecked,
      id: id || control.props.id,
      name: control.props.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e, e.target.checked);
        if (control.props.onChange) control.props.onChange(e);
      },
    });
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={formControlLabelClassName}
        {...rest}
      >
        {renderLabel()}
        {controlWithProps}
      </label>
    );
  },
);

FormControlLabel.displayName = "FormControlLabel";

export { FormControlLabel };
