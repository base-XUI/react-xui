import { ElementType } from "react";

import { CardProps } from "./Card.types";
import { cardVariants } from "./variants";
import { cn } from "@/utils/cn";

export const Card = <E extends ElementType = "div">(props: CardProps<E>) => {
  const {
    component: Component = "div",
    variant,
    square,
    className,
    ...rest
  } = props;

  return (
    <Component
      data-slot="card"
      className={cn(
        {
          "rounded-xl [&>:first-child]:rounded-t-xl [&>:last-child]:rounded-b-xl":
            !square,
        },
        cardVariants({ variant }),
        className,
      )}
      {...rest}
    />
  );
};
