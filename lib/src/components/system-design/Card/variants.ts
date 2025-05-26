import { cva, type VariantProps } from "class-variance-authority";

// Card base variants
export const cardVariants = cva(
  // Base styles
  "bg-card text-card-foreground border-border flex flex-col rounded-xl transition-all duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border shadow-sm hover:shadow-md",
        outlined: "border-2 shadow-none hover:border-primary/50",
        elevated: "border-0 shadow-lg hover:shadow-xl",
        ghost: "border-0 shadow-none bg-transparent hover:bg-muted/50",
        bordered: "border-l-4 border-l-primary shadow-sm hover:shadow-md",
      },
      size: {
        xs: "gap-2 py-3",
        sm: "gap-4 py-4",
        md: "gap-6 py-6",
        lg: "gap-8 py-8",
        xl: "gap-10 py-10",
      },
      clickable: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
        false: "",
      },
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      clickable: false,
      disabled: false,
      orientation: "vertical",
    },
  },
);

// Card header variants
export const cardHeaderVariants = cva(
  // Base styles
  "@container/card-header grid auto-rows-min items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 transition-colors",
  {
    variants: {
      size: {
        xs: "px-3 gap-1",
        sm: "px-4 gap-1.5",
        md: "px-6 gap-1.5",
        lg: "px-8 gap-2",
        xl: "px-10 gap-2.5",
      },
      orientation: {
        vertical: "grid-rows-[auto_auto]",
        horizontal: "grid-rows-1 grid-flow-col justify-start",
      },
    },
    defaultVariants: {
      size: "md",
      orientation: "vertical",
    },
  },
);

// Card content variants
export const cardContentVariants = cva(
  // Base styles
  "transition-colors",
  {
    variants: {
      size: {
        xs: "px-3",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
        xl: "px-10",
      },
      orientation: {
        vertical: "",
        horizontal: "flex-1",
      },
    },
    defaultVariants: {
      size: "md",
      orientation: "vertical",
    },
  },
);

// Card footer variants
export const cardFooterVariants = cva(
  // Base styles
  "flex items-center [.border-t]:pt-6 transition-colors",
  {
    variants: {
      size: {
        xs: "px-3 gap-2",
        sm: "px-4 gap-3",
        md: "px-6 gap-4",
        lg: "px-8 gap-5",
        xl: "px-10 gap-6",
      },
      orientation: {
        vertical: "justify-start",
        horizontal: "justify-end flex-shrink-0",
      },
      alignment: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      size: "md",
      orientation: "vertical",
      alignment: "start",
    },
  },
);

// Card title variants
export const cardTitleVariants = cva(
  // Base styles
  "leading-none font-semibold text-foreground transition-colors",
  {
    variants: {
      size: {
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
        xl: "text-2xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      weight: "semibold",
      truncate: false,
    },
  },
);

// Card description variants
export const cardDescriptionVariants = cva(
  // Base styles
  "text-muted-foreground leading-relaxed transition-colors",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      lines: {
        1: "line-clamp-1",
        2: "line-clamp-2",
        3: "line-clamp-3",
        none: "",
      },
    },
    defaultVariants: {
      size: "md",
      lines: "none",
    },
  },
);

// Card action variants
export const cardActionVariants = cva(
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end transition-colors",
  {
    variants: {
      placement: {
        header:
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        footer: "ml-auto",
        inline: "",
      },
    },
    defaultVariants: {
      placement: "header",
    },
  },
);

// Loading skeleton variants
export const cardSkeletonVariants = cva("animate-pulse bg-muted rounded", {
  variants: {
    variant: {
      text: "h-4 bg-muted/60",
      title: "h-6 bg-muted/80",
      avatar: "w-10 h-10 rounded-full bg-muted/70",
      button: "h-9 w-20 bg-muted/50",
      image: "w-full h-32 bg-muted/40",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

// Export variant props types
export type CardVariantsProps = VariantProps<typeof cardVariants>;
export type CardHeaderVariantsProps = VariantProps<typeof cardHeaderVariants>;
export type CardContentVariantsProps = VariantProps<typeof cardContentVariants>;
export type CardFooterVariantsProps = VariantProps<typeof cardFooterVariants>;
export type CardTitleVariantsProps = VariantProps<typeof cardTitleVariants>;
export type CardDescriptionVariantsProps = VariantProps<
  typeof cardDescriptionVariants
>;
export type CardActionVariantsProps = VariantProps<typeof cardActionVariants>;
export type CardSkeletonVariantsProps = VariantProps<
  typeof cardSkeletonVariants
>;

// Compound variants for common combinations
export const getCardCompoundVariants = (
  variant: CardVariantsProps["variant"],
  size: CardVariantsProps["size"],
) => {
  const variants = {
    card: cardVariants({ variant, size }),
    header: cardHeaderVariants({ size }),
    content: cardContentVariants({ size }),
    footer: cardFooterVariants({ size }),
    title: cardTitleVariants({ size }),
    description: cardDescriptionVariants({ size }),
  };

  return variants;
};
