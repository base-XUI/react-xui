import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  "relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-sm",
  {
    variants: {
      variant: {
        text: "h-4 w-full",
        circular: "rounded-full",
        rectangular: "rounded-none",
        rounded: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  },
);

export const skeletonAnimationVariants = {
  pulse: "animate-pulse",
  wave: "before:absolute before:inset-0 before:-translate-x-full before:animate-[wave_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
};
