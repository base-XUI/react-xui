// Checkbox.types.ts
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
  /**
   * The root container element for the checkbox.
   * @default 'div' (or whatever default wrapper you're using)
   */
  root?: ElementType;

  /**
   * The native HTML input element that represents the actual checkbox.
   * @default 'input'
   */
  input?: ElementType;
};
export type CheckboxSlotProps = {
  /**
   * Additional props passed to the root container element.
   * Useful for styling or accessibility.
   */
  root?: HTMLAttributes<HTMLElement>;

  /**
   * Additional props passed to the input element.
   * Allows overriding attributes like tabIndex, aria-label, etc.
   */
  input?: InputHTMLAttributes<HTMLInputElement>;
};

export type CheckboxBaseProps = {
  // ————————————————————————————————————————
  // 🔌 Core Functionality
  // ————————————————————————————————————————

  /**
   * Whether the checkbox is currently checked.
   * Use this when you want controlled behavior.
   */
  checked?: boolean;

  /**
   * The initial checked state when the checkbox is first rendered.
   * Use this for uncontrolled behavior.
   */
  defaultChecked?: boolean;

  /**
   * If true, the checkbox will show an indeterminate state.
   * Visually different but behaves as unchecked.
   */
  indeterminate?: boolean;

  /**
   * If true, the checkbox will be disabled and not interactable.
   */
  disabled?: boolean;

  /**
   * If true, the checkbox must be checked before form submission.
   */
  required?: boolean;

  /**
   * Callback fired when the checked state changes.
   * @param event - The change event from the input element.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  // ————————————————————————————————————————
  // 🎨 Styling & Theming
  // ————————————————————————————————————————

  /**
   * The color variant of the checkbox.
   * Typically used to match your design system or theme.
   */
  color?: CheckboxColor;

  /**
   * The size of the checkbox.
   * Can be used to adjust spacing, icon size, etc.
   */
  size?: CheckboxSize;

  /**
   * Optional class name applied to the root element.
   * Used to apply additional styles or utility classes.
   */
  className?: string;

  // ————————————————————————————————————————
  // 📄 Form-related Props
  // ————————————————————————————————————————

  /**
   * The ID of the checkbox element.
   * Useful for associating labels or managing focus.
   */
  id?: string;

  /**
   * The name of the checkbox, submitted with form data.
   */
  name?: string;

  /**
   * The value of the checkbox, submitted with form data when checked.
   */
  value?: string | number | boolean;

  // ————————————————————————————————————————
  // 🖼️ Icons / Visuals
  // ————————————————————————————————————————

  /**
   * Custom icon displayed inside the checkbox in any state.
   * Overrides both checked and indeterminate icons if provided.
   */
  icon?: ReactNode;

  /**
   * Custom icon shown when the checkbox is checked.
   * Only used if `icon` is not provided.
   */
  checkedIcon?: ReactNode;

  /**
   * Custom icon shown when the checkbox is in indeterminate state.
   * Only used if `icon` is not provided.
   */
  indeterminateIcon?: ReactNode;

  // ————————————————————————————————————————
  // 🛠️ Customization & Slot API
  // ————————————————————————————————————————

  /**
   * Customize the underlying elements used for rendering parts of the checkbox.
   * Useful for integrating with UI libraries or adding custom wrappers.
   */
  slots?: CheckboxSlots;

  /**
   * Apply custom props to specific internal elements (root/input).
   * Useful for setting data-attributes, aria roles, or extra event handlers.
   */
  slotProps?: CheckboxSlotProps;
} & VariantProps<typeof checkboxVariants>;

export type CheckboxProps = CheckboxBaseProps;
