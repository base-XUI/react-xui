// Checkbox.types.ts
import { PolymorphicComponentPropWithRef } from "@/utils/polymorphic";
import { VariantProps } from "class-variance-authority";
import { CheckboxColor, checkboxVariants, CheckboxSize } from "./variants";

export type CheckboxBaseProps = {
  /**
   * Controlled checked state of the checkbox
   */
  checked?: boolean;

  /**
   * Custom icon to display when checked
   */
  checkedIcon?: React.ReactNode;

  /**
   * The color theme of the component.
   */
  color?: CheckboxColor | string;

  /**
   * Uncontrolled default checked state
   */
  defaultChecked?: boolean;

  /**
   * Disabled state of the checkbox
   */
  disabled?: boolean;

  /**
   * The size of the component.
   */
  size?: CheckboxSize | string;

  /**
   * Unique identifier for the checkbox
   */
  id?: string;

  /**
   * Additional class names to apply
   */
  className?: string;

  /**
   * Ref to the underlying input element
   */
  ref?: React.Ref<HTMLInputElement>;

  /**
   * Name attribute of the input element.
   * Important for form submission and grouping checkboxes.
   */
  name?: string;

  /**
   * Value attribute of the input element
   */
  value?: string | number;

  /**
   * Required state for form validation
   */
  required?: boolean;

  /**
   * Custom icon to display when unchecked
   */
  icon?: React.ReactNode;

  /**
   * Custom icon to display in indeterminate state
   */
  indeterminateIcon?: React.ReactNode;

  /**
   * Callback when checkbox state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Indeterminate state of the checkbox
   */
  indeterminate?: boolean;

  /**
   * Props for internal component slots
   */
  slotProps?: {
    /** Props for the root span element */
    root?: React.HTMLAttributes<HTMLElement>;
    /** Props for the input element */
    input?: React.InputHTMLAttributes<HTMLInputElement>;
  };
} & VariantProps<typeof checkboxVariants>;

export type CheckboxProps<C extends React.ElementType = "input"> =
  PolymorphicComponentPropWithRef<C, CheckboxBaseProps>;
