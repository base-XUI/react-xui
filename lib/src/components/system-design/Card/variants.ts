import { cva } from "class-variance-authority";

import { CardVariant } from "./Card.types";

export const cardVariants = cva(
  "text-card-foreground space-y-6 [&>:first-child]:pt-6 [&>:last-child]:pb-6",
  {
    variants: {
      variant: {
        filled: ["bg-card border-border border shadow-sm"],
        outlined: [
          "bg-transparent border border-border",
          "hover:bg-card/5 transition-colors",
        ],
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
);

export type CardVariantsProps = {
  variant?: CardVariant;
};
