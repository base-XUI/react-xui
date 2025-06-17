import {
  ChangeEvent,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { VariantProps } from "class-variance-authority";
import { checkboxVariants, CheckboxColor, CheckboxSize } from "./variants";

export type CheckboxSlots = {
  root?: ElementType;
  input?: ElementType;
};
export type CheckboxSlotProps = {
  root?: HTMLAttributes<HTMLElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
};

export type CheckboxBaseProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  color?: CheckboxColor;
  size?: CheckboxSize;
  className?: string;
  id?: string;
  name?: string;
  value?: string | number | boolean;
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  indeterminateIcon?: ReactNode;
  slots?: CheckboxSlots;
  slotProps?: CheckboxSlotProps;
} & VariantProps<typeof checkboxVariants>;

export type CheckboxProps = CheckboxBaseProps;
