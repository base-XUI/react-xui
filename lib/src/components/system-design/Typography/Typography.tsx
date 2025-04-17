import React from "react";
import { cn } from "@/utils/cn";
import {
  typographyVariants,
  HTML_MAPPINGS,
  TYPOGRAPHY_VARIANTS,
} from "./variants";
import { type TypographyProps } from "./Typography.types";
import { adaptPropsForA11y } from "@/utils/a11y";

/**
 * Typography component that supports polymorphic rendering and accessibility features
 * Compatible with React 19's direct ref handling
 */
const Typography = <C extends React.ElementType = "p">({
  component,
  align,
  variant = "body1",
  color,
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  className = "",
  fontFamily = "primary",
  inherit = false,
  children,
  ref, // React 19 direct ref handling
  ...rest
}: TypographyProps<C>) => {
  // Determine the correct HTML element based on variant or specified component
  const validVariant =
    variant && variant in TYPOGRAPHY_VARIANTS ? variant : "body1";
  const Component = component || HTML_MAPPINGS[validVariant] || "p";
  const fontClass = `font-${fontFamily}`;

  // Apply a11y props - mostly for semantic correctness
  const a11yProps = adaptPropsForA11y(
    { ...rest },
    typeof Component === "string" ? Component : "div",
  );

  return (
    <Component
      ref={ref}
      className={cn(
        inherit ? "" : typographyVariants({ variant, align, color }),
        noWrap && "whitespace-nowrap",
        gutterBottom && "mb-2",
        paragraph && "mb-4",
        fontClass,
        className,
      )}
      {...a11yProps}
    >
      {children}
    </Component>
  );
};

Typography.displayName = "Typography";

export { Typography };
