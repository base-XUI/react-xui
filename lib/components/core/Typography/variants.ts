import { cva } from "class-variance-authority";

export const TYPOGRAPHY_VARIANTS = {
  h1: "text-7xl font-bold",
  h2: "text-6xl font-bold",
  h3: "text-5xl font-bold",
  h4: "text-4xl font-bold",
  h5: "text-2xl font-bold",
  h6: "text-2xl font-bold",
  subtitle1: "text-xl font-semibold",
  subtitle2: "text-lg font-semibold",
  body1: "text-xl font-normal",
  body2: "text-lg font-normal",
  body3: "text-base font-normal",
  caption: "text-xs font-normal",
} as const;

export const TYPOGRAPHY_COLORS = {
  primary: "text-primary",
  "primary-foreground": "text-primary-foreground",
  secondary: "text-secondary",
  "secondary-foreground": "text-secondary-foreground",
  muted: "text-muted",
  "muted-foreground": "text-muted-foreground",
  accent: "text-accent",
  "accent-foreground": "text-accent-foreground",
  destructive: "text-destructive",
  "destructive-foreground": "text-destructive-foreground",
  white: "text-white",
  black: "text-black",
  "dark-grey": "text-dark-grey",
  "light-grey": "text-light-grey",
  warning: "text-warning",
  monochrome: "text-monochrome",
  "monochrome-foreground": "text-monochrome-foreground",
  "lighter-grey": "text-lighter-grey",
} as const;

export const TYPOGRAPHY_ALIGNMENTS = {
  center: "text-center",
  start: "text-start",
  end: "text-end",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;
export type TypographyColor = keyof typeof TYPOGRAPHY_COLORS;
export type TypographyAlignment = keyof typeof TYPOGRAPHY_ALIGNMENTS;

export const typographyVariants = cva("whitespace-pre-line", {
  variants: {
    variant: TYPOGRAPHY_VARIANTS,
    align: TYPOGRAPHY_ALIGNMENTS,
    color: TYPOGRAPHY_COLORS,
  },
  defaultVariants: {
    variant: "body1",
    align: "start",
    color: "monochrome",
  },
});

export type TypographyVariantProps = NonNullable<
  Parameters<typeof typographyVariants>[0]
>;
