import React from "react";
import { AccordionProps } from "./Accordion.types";

export const AccordionDetails = <C extends React.ElementType = "div">({
  children,
  expanded,
  id,
}: AccordionProps<C>) => {
  return (
    <div
      id={`${id}-details`}
      role="region"
      aria-labelledby={`${id}-summary`}
      className={`bg-accent px-4 py-3 transition-opacity duration-300 ease-in-out ${
        expanded ? "block opacity-100" : "hidden opacity-0"
      }`}
    >
      {children}
    </div>
  );
};
