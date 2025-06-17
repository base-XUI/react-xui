import { ElementType } from "react";

import { CardActionsProps } from "./Card.types";
import { cn } from "@/utils/cn";

export function CardActions<E extends ElementType = "div">(
  props: CardActionsProps<E>,
) {
  const {
    className,
    component: Component = "div",
    disableSpacing = false,
    alignment = "start",
    spacing = "normal",
    ...rest
  } = props;
  return (
    <Component
      data-slot="card-actions"
      className={cn(
        "flex items-center px-2 py-2",

        !disableSpacing && [
          spacing === "compact" && "gap-1",
          spacing === "normal" && "gap-2",
          spacing === "comfortable" && "gap-4",
        ],

        alignment === "start" && "justify-start",
        alignment === "end" && "justify-end",
        alignment === "center" && "justify-center",
        alignment === "space-between" && "justify-between",

        "px-6",

        "[.border-t]:pt-6",
        className,
      )}
      {...rest}
    />
  );
}
