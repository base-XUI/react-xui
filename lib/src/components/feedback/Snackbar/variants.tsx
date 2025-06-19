import { SnackbarAnchorOrigin } from "./Snackbar.types";
import { cva, type VariantProps } from "class-variance-authority";

export const snackbarVariants = cva(
  "fixed z-50 flex max-w-md min-w-[356px] items-center rounded-md bg-white text-black transition-all duration-300 ease-in-out",
  {
    variants: {
      verticalPosition: {
        top: "top-4",
        bottom: "bottom-4",
      },
      horizontalPosition: {
        left: "left-4",
        center: "left-1/2 transform -translate-x-1/2",
        right: "right-4",
      },
      visibility: {
        visible: "",
        hidden: "",
      },
    },
    compoundVariants: [
      {
        verticalPosition: "top",
        visibility: "visible",
        className: "translate-y-0 opacity-100",
      },
      {
        verticalPosition: "top",
        visibility: "hidden",
        className: "-translate-y-full opacity-0",
      },
      {
        verticalPosition: "bottom",
        visibility: "visible",
        className: "translate-y-0 opacity-100",
      },
      {
        verticalPosition: "bottom",
        visibility: "hidden",
        className: "translate-y-full opacity-0",
      },
    ],
    defaultVariants: {
      verticalPosition: "bottom",
      horizontalPosition: "left",
      visibility: "hidden",
    },
  },
);

export type SnackbarVariantsProps = VariantProps<typeof snackbarVariants>;

// Helper function to convert anchorOrigin to variant props
export const getSnackbarVariantProps = (
  anchorOrigin: SnackbarAnchorOrigin,
  isVisible: boolean,
): SnackbarVariantsProps => {
  return {
    verticalPosition: anchorOrigin.vertical,
    horizontalPosition: anchorOrigin.horizontal,
    visibility: isVisible ? "visible" : "hidden",
  };
};
