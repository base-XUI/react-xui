/**
 * Utility to determine if an element supports a specific attribute
 * Used for accessibility enhancements
 */
export const elementSupportsAttribute = (
  element: string,
  attribute: string,
): boolean => {
  const supportedAttributes: Record<string, string[]> = {
    button: [
      "disabled",
      "form",
      "formaction",
      "formenctype",
      "formmethod",
      "formnovalidate",
      "formtarget",
      "name",
      "type",
      "value",
    ],
    input: ["disabled", "form", "name", "type", "value"],
    textarea: [
      "disabled",
      "form",
      "maxlength",
      "minlength",
      "name",
      "placeholder",
    ],
    select: ["disabled", "form", "multiple", "name", "size"],
    option: ["disabled", "label", "selected", "value"],
    // Add more as needed
  };

  return supportedAttributes[element]?.includes(attribute) || false;
};

// Define specific type interface for accessibility props
interface A11yProps {
  role?: string;
  disabled?: boolean;
  "aria-disabled"?: boolean | undefined;
  [key: string]: unknown;
}

/**
 * Utility to adapt props for accessibility based on element type
 * Especially useful for polymorphic components
 */
export const adaptPropsForA11y = <P extends Record<string, unknown>>(
  props: P,
  elementType: string,
): Record<string, unknown> => {
  // Create a new object to avoid mutating the input props
  // We need to use type assertion to make TypeScript happy
  const result: Record<string, unknown> = { ...props };

  // Set role for non-button/link elements that should act as buttons
  if (!["button", "a"].includes(elementType) && !("role" in props)) {
    result["role"] = "button";
  }

  // Handle disabled state for elements that don't support it natively
  if ("disabled" in props) {
    const isDisabled = Boolean(props["disabled"]);

    if (elementSupportsAttribute(elementType, "disabled")) {
      result["disabled"] = isDisabled;
    } else if (isDisabled) {
      // For elements that don't support disabled, remove the prop
      delete result["disabled"];
    }

    // Always add aria-disabled for accessibility
    result["aria-disabled"] = isDisabled || undefined;
  }

  return result;
};

/**
 * Apply a11y attributes to a props object for a specific element type
 * A more strongly typed version for cases where we know the specific props
 */
export const applyA11yProps = <P extends A11yProps>(
  props: P,
  elementType: string,
): P & A11yProps => {
  const a11yProps = adaptPropsForA11y(props, elementType);
  return a11yProps as P & A11yProps;
};
