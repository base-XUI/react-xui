import { cn } from "@/utils/cn";
import { typographyVariants } from "./variants";
import { type TypographyProps } from "./Typography.types";
import { createPolymorphic } from "@/utils/createPolymorphic";

export const Typography = createPolymorphic<"p", TypographyProps>(
  "p",
  "Typography",
  ({
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
    ...props
  }) => {
    const fontClass = `font-${fontFamily}`;

    return (
      <div
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
      </div>
    );
  },
);
