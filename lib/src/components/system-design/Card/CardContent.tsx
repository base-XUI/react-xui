import { ElementType } from "react";

import { cn } from "@/utils/cn";
import { CardContentProps } from "./Card.types";

export function CardContent<E extends ElementType = "div">(props: CardContentProps<E>) {
  const { component: Component = "div", className } = props;
  return (
    <Component
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}