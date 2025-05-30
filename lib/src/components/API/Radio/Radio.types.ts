import {
  ChangeEvent,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { VariantProps } from "class-variance-authority";
import { radioVariants, RadioColor, RadioSize } from "./variants";

export type RadioSlots = {
  /**
   * The root container element for the radio.
   * @default 'span'
   */
  root?: ElementType;

  /**
   * The native HTML input element that represents the actual radio.
   * @default 'input'
   */
  input?: ElementType;
};

export type RadioSlotProps = {
  /**
   * Additional props passed to the root container element.
   * Useful for styling or accessibility.
   */
  root?: HTMLAttributes<HTMLElement> | HTMLInputElement;

  /**
   * Additional props passed to the input element.
   * Allows overriding attributes like tabIndex, aria-label, etc.
   */
  input?: InputHTMLAttributes<HTMLInputElement>;
};

export type RadioBaseProps = {
  // ————————————————————————————————————————
  // 🔌 Core Functionality
  // ————————————————————————————————————————

  /**
   * Whether the radio is currently checked.
   * Use this when you want controlled behavior.
   */
  checked?: boolean;

  /**
   * The initial checked state when the radio is first rendered.
   * Use this for uncontrolled behavior.
   */
  defaultChecked?: boolean;

  /**
   * If true, the radio will be disabled and not interactable.
   */
  disabled?: boolean;

  /**
   * If true, the radio must be checked before form submission.
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
   * The color variant of the radio.
   * Typically used to match your design system or theme.
   */
  color?: RadioColor;

  /**
   * The size of the radio.
   * Can be used to adjust spacing, icon size, etc.
   */
  size?: RadioSize;

  /**
   * Optional class name applied to the root element.
   * Used to apply additional styles or utility classes.
   */
  className?: string;

  // ————————————————————————————————————————
  // 📄 Form-related Props
  // ————————————————————————————————————————

  /**
   * The ID of the radio element.
   * Useful for associating labels or managing focus.
   */
  id?: string;

  /**
   * The name of the radio, submitted with form data.
   */
  name?: string;

  /**
   * The value of the radio, submitted with form data when checked.
   */
  value?: string | number | boolean;

  // ————————————————————————————————————————
  // 🖼️ Icons / Visuals
  // ————————————————————————————————————————

  /**
   * Custom icon displayed inside the radio in unchecked state.
   */
  icon?: ReactNode;

  /**
   * Custom icon shown when the radio is checked.
   */
  checkedIcon?: ReactNode;

  // ————————————————————————————————————————
  // 🛠️ Customization & Slot API
  // ————————————————————————————————————————

  /**
   * Customize the underlying elements used for rendering parts of the radio.
   * Useful for integrating with UI libraries or adding custom wrappers.
   */
  slots?: RadioSlots;

  /**
   * Apply custom props to specific internal elements (root/input).
   * Useful for setting data-attributes, aria roles, or extra event handlers.
   */
  slotProps?: RadioSlotProps;
} & VariantProps<typeof radioVariants>;

export type RadioProps = RadioBaseProps;
