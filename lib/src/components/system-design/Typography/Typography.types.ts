import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { typographyVariants } from "./variants";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

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

/**
 * Base props for Typography component
 */
export type TypographyBaseProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> &
  VariantProps<typeof typographyVariants> & {
    /**
     * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     */
    noWrap?: boolean;
    /**
     * If true, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    /**
     * If true, the text will have a bottom margin applied to create paragraph spacing.
     */
    paragraph?: boolean;
    /**
     * The font family to use.
     */
    fontFamily?: keyof typeof FONT_FAMILIES | string;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * If true, the typography will inherit styles from its parent.
     */
    inherit?: boolean;
  };

/**
 * Props for the Typography component including the ref
 * Compatible with React 19's new ref handling
 */
export type TypographyProps<C extends React.ElementType = "p"> =
  PolymorphicComponentProp<C, TypographyBaseProps>;

/**
 * Typography component type
 */
export type TypographyComponent = PolymorphicComponent<
  TypographyBaseProps,
  "p"
>;
