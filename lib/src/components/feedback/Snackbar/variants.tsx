import { ReactNode } from "react";
import {
  SnackbarAnchorOrigin,
  SnackbarSeverity,
  SnackbarVariant,
} from "./Snackbar.types";


// Severity icons and colors
const severityConfig: Record<
  SnackbarSeverity,
  { icon: ReactNode; filledClass: string; outlinedClass: string }
> = {
  primary: {
    icon: null,
    filledClass: "bg-white text-black",
    outlinedClass: "bg-white border border-gray-200 text-black",
  },
  secondary: {
    icon: null,
    filledClass: "bg-gray-700 text-white",
    outlinedClass: "bg-white border border-gray-700 text-gray-700",
  },
  warning: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    filledClass: "bg-amber-500 text-white",
    outlinedClass: "bg-white border border-amber-500 text-amber-500",
  },
  error: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    filledClass: "bg-red-500 text-white",
    outlinedClass: "bg-white border border-red-500 text-red-500",
  },
  info: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    filledClass: "bg-blue-500 text-white",
    outlinedClass: "bg-white border border-blue-500 text-blue-500",
  },
  success: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    filledClass: "bg-green-500 text-white",
    outlinedClass: "bg-white border border-green-500 text-green-500",
  },
};

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

// Get variant classes based on severity and variant
const getVariantClasses = (
  severity: SnackbarSeverity,
  variant: SnackbarVariant,
): string => {
  return variant === "filled"
    ? severityConfig[severity].filledClass
    : severityConfig[severity].outlinedClass;
};

export { severityConfig, getPositionClasses, getVariantClasses };
