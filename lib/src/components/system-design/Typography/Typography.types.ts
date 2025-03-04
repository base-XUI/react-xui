import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { typographyVariants } from "./variants";
import { PolymorphicProps } from "@/utils/PolymorphicComponent";

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

export interface TypographyTypeMap {
  props: TypographyOwnProps;
  defaultComponent: "p";
}

export type TypographyOwnProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> &
  VariantProps<typeof typographyVariants> & {
    noWrap?: boolean;
    gutterBottom?: boolean;
    paragraph?: boolean;
    fontFamily?: keyof typeof FONT_FAMILIES | string;
    children?: React.ReactNode;
    inherit?: boolean;
  };

export type TypographyProps<
  RootComponentType extends
    React.ElementType = TypographyTypeMap["defaultComponent"],
> = PolymorphicProps<TypographyTypeMap, RootComponentType>;
