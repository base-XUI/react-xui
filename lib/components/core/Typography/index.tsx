import * as React from "react";
import { cn } from "@/utils";
import type { VariantProps } from "class-variance-authority";
import { typographyVariants } from "./variants";

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

const FONT_FAMILIES = {
  primary: "",
  secondary: "",
} as const;

const HTML_MAPPINGS: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "p",
  body2: "p",
  body3: "p",
  caption: "p",
};

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
  noWrap?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  fontFamily?: keyof typeof FONT_FAMILIES | string;
  children: React.ReactNode;
  inherit?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      align,
      variant = "body1",
      component,
      color,
      noWrap = false,
      gutterBottom = false,
      paragraph = false,
      className = "",
      fontFamily = "primary",
      inherit = false,
      children,
      ...props
    },
    ref
  ) => {
    const Tag =
      component || (variant && !paragraph ? HTML_MAPPINGS[variant] : "p");
    const fontClass =
      FONT_FAMILIES[fontFamily as keyof typeof FONT_FAMILIES] ||
      `font-${fontFamily}`;

    return (
      <Tag
        ref={ref}
        className={cn(
          inherit ? "" : typographyVariants({ variant, align, color }),
          noWrap && "whitespace-nowrap",
          gutterBottom && "mb-2",
          paragraph && "mb-4",
          fontClass,
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = "Typography";

export { Typography, type TypographyProps };
