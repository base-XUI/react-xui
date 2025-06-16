import { cva, VariantProps } from "class-variance-authority";

// ————————————————————————————————————————————————
// 🎨 Checkbox Color Options
// ————————————————————————————————————————————————

/**
 * Available color themes for the radio.
 * These align with typical design system tokens.
 */
export type RadioColor =
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
 * Available size variants for the radio.
 * Controls dimensions and text scale.
 */
export type RadioSize = "small" | "medium" | "large";

// ————————————————————————————————————————————————
// 🧱 Helper Function: Generate Compound Variants
// ————————————————————————————————————————————————

/**
 * Generates compound variant definitions for a given color and its styles.
 * Applies the same styles to both 'checked' states.
 *
 * @param color - The color variant (e.g., 'primary')
 * @param styles - Tailwind CSS classes to apply
 * @returns Array of compound variant objects
 */
const generateColorVariants = (
  color: RadioColor,
  styles: string,
): {
  color: RadioColor;
  state: "checked";
  className: string;
}[] => [{ color, state: "checked", className: styles }];

// ————————————————————————————————————————————————
// 🧩 Checkbox Base Styles + Variants
// ————————————————————————————————————————————————

/**
 * Base styles and dynamic variants for the radio component.
 * Uses class-variance-authority (cva) to define responsive, theme-aware classes.
 */
export const radioVariants = cva(
  // Base classes applied to all variants
  "flex items-center justify-center transition-colors rounded-full cursor-pointer border",
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
       * Represents visual state of the radio
       */
      state: {
        checked: "",
        unchecked: "bg-transparent hover:bg-gray-50",
      },

      /**
       * Radio Size variants
       * Controls dimension and icon/text scaling
       */
      size: {
        small: "h-4 w-4  ",
        medium: "h-5 w-5  ",
        large: "h-6 w-6  ",
      },
    },

    /**
     * Compound variants
     * Apply specific styles based on combinations of props
     */
    compoundVariants: [
      // Color-specific styles for checked states
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

/**
 * Extracts valid prop types from `radioVariants`.
 * Use this when defining props for the Radio component.
 */
export type RadioVariantProps = VariantProps<typeof radioVariants>;
