import { ElementType } from "react";
import { cn } from "@/utils/cn";
import { CardProps } from "./Card.types";

export const Card = <E extends ElementType = "div">(props: CardProps<E>) => {
  const { component: Component = "div", className, ...rest } = props;

  return (
    <Component
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground border-border space-y-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...rest}
    />
  );
};
