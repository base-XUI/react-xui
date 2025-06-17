import type { ReactElement, Ref, ReactNode } from "react";

export const VALID_INPUT_TYPES = ["checkbox", "radio"];
export const ALLOWED_COMPONENT_NAMES = ["Checkbox", "Radio", "Switch"];

export interface FormControlComponentProps {
  checked?: boolean;
  disabled?: boolean;
  value?: string | number | boolean | readonly string[] | null;
  defaultChecked?: boolean;
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FormControlControl = ReactElement<FormControlComponentProps>;

export type LabelPlacement = "start" | "end" | "top" | "bottom";

export interface FormControlLabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  control: FormControlControl;
  label?: ReactNode;
  labelPlacement?: LabelPlacement;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  value?: string | number | boolean | readonly string[] | null;
  defaultChecked?: boolean;
  id?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  inputRef?: Ref<HTMLInputElement>;
}
