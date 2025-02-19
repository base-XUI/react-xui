import * as React from "react";
import { cn } from "@/utils/cn";
import { typographyVariants } from "./variants";
import {
  type TypographyProps,
  HTML_MAPPINGS,
  FONT_FAMILIES,
} from "./Typography.types";

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
    ref,
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
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Typography.displayName = "Typography";

export { Typography, type TypographyProps };
