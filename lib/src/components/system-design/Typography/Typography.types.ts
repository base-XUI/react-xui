import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { typographyVariants } from "./variants";
import { PolymorphicComponent } from "@/types/polymorphic";

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;
export type TypographyColor = NonNullable<
  VariantProps<typeof typographyVariants>["color"]
>;
export type TypographyAlignment = NonNullable<
  VariantProps<typeof typographyVariants>["align"]
>;

export const FONT_FAMILIES = {
  primary: "",
  secondary: "",
} as const;

export const HTML_MAPPINGS: Record<TypographyVariant, React.ElementType> = {
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

export interface TypographyProps
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

export type TypographyBaseProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> &
  VariantProps<typeof typographyVariants> & {
    noWrap?: boolean;
    gutterBottom?: boolean;
    paragraph?: boolean;
    fontFamily?: keyof typeof FONT_FAMILIES | string;
    children: React.ReactNode;
    inherit?: boolean;
  };

export type TypographyComponent = PolymorphicComponent<
  "p",
  TypographyBaseProps
>;
