import { cn } from "@/utils/cn";
import { CardContentProps } from "./Card.types";

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}