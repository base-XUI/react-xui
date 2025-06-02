import { cn } from "@/utils/cn";
import { CardTitleProps } from "./Card.types";

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}