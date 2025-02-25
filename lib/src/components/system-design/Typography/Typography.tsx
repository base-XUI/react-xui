import React from "react";
import { cn } from "@/utils/cn";
import {
  typographyVariants,
  HTML_MAPPINGS,
  TYPOGRAPHY_VARIANTS,
} from "./variants";
import { TypographyTypeMap, type TypographyProps } from "./Typography.types";
import { PolymorphicComponent } from "@/utils/PolymorphicComponent";

const Typography = React.forwardRef(function Typography<
  RootComponentType extends React.ElementType,
>(
  {
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
    ...rest
  }: TypographyProps<RootComponentType>,
  ref: React.ComponentPropsWithRef<RootComponentType>["ref"],
) {
  const validVariant =
    variant && variant in TYPOGRAPHY_VARIANTS ? variant : "body1";
  const Component = component || HTML_MAPPINGS[validVariant] || "p";
  const fontClass = `font-${fontFamily}`;

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
      {...rest}
    >
      {children}
    </Component>
  );
}) as PolymorphicComponent<TypographyTypeMap>;

export { Typography };
