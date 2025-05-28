import { SnackbarAnchorOrigin } from "./Snackbar.types";

// Get position classes based on anchorOrigin
const getPositionClasses = (anchorOrigin: SnackbarAnchorOrigin): string => {
  const { vertical, horizontal } = anchorOrigin;

  const verticalClasses = {
    top: "top-4",
    bottom: "bottom-4",
  };

  const horizontalClasses = {
    left: "left-4",
    center: "left-1/2 transform -translate-x-1/2",
    right: "right-4",
  };

  return `${verticalClasses[vertical]} ${horizontalClasses[horizontal]}`;
};

export { getPositionClasses };
