import React from "react";
import { AccordionProps } from "./Accordion.types";

export const AccordionDetails = <C extends React.ElementType = "div">({
  children,
  expanded,
  id,
  detailsClassName,
}: AccordionProps<C>) => {
  return (
    <div
      id={`${id}-details`}
      role="region"
      aria-labelledby={`${id}-summary`}
      className={`px-4 py-3 ${expanded ? "accordion" : "accordion-up"} ${detailsClassName}`}
    >
      {children}
    </div>
  );
};
