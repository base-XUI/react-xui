import { ElementType } from "react";

import { cn } from "@/utils/cn";
import { CardMediaProps } from "./Card.types";

export function CardMedia<E extends ElementType = "div">(
  props: CardMediaProps<E>,
) {
  const {
    component: Component = "div",
    className,
    src,
    alt,
    aspectRatio = "16/9",
    objectFit = "cover",
    ...rest
  } = props;
  return (
    <Component
      data-slot="card-media"
      className={cn(
        "overflow-hidden first:-mt-6 first:rounded-t-xl last:rounded-b-xl only:rounded-xl",

        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "4/3" && "aspect-[4/3]",
        aspectRatio === "1/1" && "aspect-square",
        aspectRatio === "3/2" && "aspect-[3/2]",
        className,
      )}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt || ""}
          className={cn(
            "h-full w-full",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down",
          )}
        />
      ) : (
        // Placeholder when no src is provided
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      )}
    </Component>
  );
}
