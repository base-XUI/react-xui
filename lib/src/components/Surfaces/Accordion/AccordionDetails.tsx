import React from "react";
import { AccordionProps } from "./Accordion.types";
import { twMerge } from "tailwind-merge";

export const AccordionDetails = <C extends React.ElementType = "div">({
  children,
  expanded,
  id,
  classes,
}: AccordionProps<C>) => {
  const detailsClass = twMerge(
    "px-4 py-1",
    expanded ? "accordion" : "accordion-up",
    classes?.details,
  );
  return (
    <div
      id={`${id}-details`}
      role="region"
      aria-labelledby={`${id}-summary`}
      className={detailsClass}
    >
      {children}
    </div>
  );
};
