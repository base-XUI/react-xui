import { cva, VariantProps } from "class-variance-authority";

// ————————————————————————————————————————————————
// 🎨 Checkbox Color Options
// ————————————————————————————————————————————————

/**
 * Available color themes for the checkbox.
 * These align with typical design system tokens.
 */
export type CheckboxColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "muted";

// ————————————————————————————————————————————————
// 📏 Checkbox Size Options
// ————————————————————————————————————————————————

/**
 * Available size variants for the checkbox.
 * Controls dimensions and text scale.
 */
export type CheckboxSize = "small" | "medium" | "large";

// ————————————————————————————————————————————————
// 🧱 Helper Function: Generate Compound Variants
// ————————————————————————————————————————————————

/**
 * Generates compound variant definitions for a given color and its styles.
 * Applies the same styles to both 'checked' and 'indeterminate' states.
 *
 * @param color - The color variant (e.g., 'primary')
 * @param styles - Tailwind CSS classes to apply
 * @returns Array of compound variant objects
 */
const generateColorVariants = (
  color: CheckboxColor,
  styles: string,
): {
  color: CheckboxColor;
  state: "checked" | "indeterminate";
  className: string;
}[] => [
  { color, state: "checked", className: styles },
  { color, state: "indeterminate", className: styles },
];

// ————————————————————————————————————————————————
// 🧩 Checkbox Base Styles + Variants
// ————————————————————————————————————————————————

/**
 * Base styles and dynamic variants for the checkbox component.
 * Uses class-variance-authority (cva) to define responsive, theme-aware classes.
 */
export const checkboxVariants = cva(
  // Base classes applied to all variants
  "flex items-center justify-center transition-colors rounded cursor-pointer border",
  {
    variants: {
      /**
       * Color variants
       * Used via `color="primary"` etc.
       */
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        info: "",
        warning: "",
        muted: "",
      },

      /**
       * State variants
       * Represents visual state of the checkbox
       */
      state: {
        checked: "",
        unchecked: "bg-transparent hover:bg-gray-50",
        indeterminate: "",
      },

      /**
       * Size variants
       * Controls dimension and icon/text scaling
       */
      size: {
        small: "h-4 w-4 text-xs",
        medium: "h-5 w-5 text-sm",
        large: "h-6 w-6 text-base",
      },
    },

    /**
     * Compound variants
     * Apply specific styles based on combinations of props
     */
    compoundVariants: [
      // Color-specific styles for checked/indeterminate states
      ...generateColorVariants(
        "primary",
        "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90",
      ),
      ...generateColorVariants(
        "secondary",
        "text-secondary-foreground border-secondary-foreground bg-secondary hover:bg-secondary/90",
      ),
      ...generateColorVariants(
        "success",
        "text-success-foreground border-success-foreground bg-success hover:bg-success/90",
      ),
      ...generateColorVariants(
        "error",
        "text-error-foreground border-error-foreground bg-error hover:bg-error/90",
      ),
      ...generateColorVariants(
        "info",
        "text-info-foreground border-info-foreground bg-info hover:bg-info/90",
      ),
      ...generateColorVariants(
        "warning",
        "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90",
      ),
      ...generateColorVariants(
        "muted",
        "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90",
      ),

      // Unchecked state fallback for all colors
      {
        state: "unchecked",
        className: "border-gray-300 hover:border-gray-400",
      },
    ],

    /**
     * Default values for each variant if not specified
     */
    defaultVariants: {
      color: "primary",
      size: "medium",
      state: "unchecked",
    },
  },
);

// ————————————————————————————————————————————————
// 🔍 Type Helpers (for use in Checkbox component)
// ————————————————————————————————————————————————

/**
 * Extracts valid prop types from `checkboxVariants`.
 * Use this when defining props for the Checkbox component.
 */
export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
