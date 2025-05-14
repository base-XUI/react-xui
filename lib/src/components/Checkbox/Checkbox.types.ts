import { ReactElement, ElementType } from "react";

import { VariantProps } from "class-variance-authority";
import { checkboxVariants, CheckboxColor } from "./variants";

import {
  PolymorphicComponent,
  PolymorphicComponentProp,
} from "@/utils/polymorphic";

export type CheckboxBaseProps = {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * If true, the component is checked
   */
  checked?: boolean;

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;

  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;

  /**
   * If true, the input element is required.
   */
  required?: boolean;

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;

  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;

  /**
   * The color theme of the component.
   */
  color?: CheckboxColor | string;

  /**
   * The size of the component. small is equivalent to the dense checkbox styling.
   */
  size?: "small" | "medium" | "large" | string;

  value?: boolean[];
  label?: string;

  /**
   *
   * @param event 	Callback fired when the state is changed.
   * @returns  event The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  indeterminate?: boolean;

  indeterminateIcon?: React.ReactNode;
} & VariantProps<typeof checkboxVariants>;

export type CheckboxGroupProps = {
  children?: ReactElement<CheckboxBaseProps>[];
  label?: string;
  value?: boolean[];
  onChange?: (checked: boolean[]) => void;
  size?: "small" | "medium" | "large";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "muted";
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
} & VariantProps<typeof checkboxVariants>;
/**
 * Props for the Checkbox component including the ref
 * Compatible with React 19's new ref handling
 */
export type CheckboxProps<C extends ElementType = "input"> =
  PolymorphicComponentProp<C, CheckboxBaseProps>;

/**
 * Checkbox component type
 */
export type CheckboxComponent = PolymorphicComponent<
  CheckboxBaseProps,
  "input"
>;
