import { ElementType } from "react";

import { CardActionAreaProps } from "./Card.types";
import { cn } from "@/utils/cn";

export function CardActionArea<E extends ElementType = "button">(
  props: CardActionAreaProps<E>,
) {
  const {
    component: Component = "button",
    className,
    disabled = false,
    children,
    ...rest
  } = props;
  return (
    <Component
      data-slot="card-action-area"
      disabled={Component === "button" ? disabled : undefined}
      className={cn(
        "relative block w-full space-y-6 text-left",

        "transition-colors duration-200 ease-in-out",
        "hover:bg-gray-100",
        // "focus-visible:bg-gray-200",
        // "active:bg-gray-200",

        "focus-visible:outline-none",

        disabled && ["pointer-events-none", "opacity-50", "cursor-not-allowed"],

        Component === "button" && [
          "border-0",
          "bg-transparent",
          "cursor-pointer",
          "font-inherit",
          "text-inherit",
        ],

        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
