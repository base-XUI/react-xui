import React from "react";
import { AccordionProps } from "./Accordion.types";

export const AccordionDetails = <C extends React.ElementType = "div">({
  children,
  isOpen,
  accordionId,
}: AccordionProps<C>) => {
  console.log("first", isOpen, children);
  return (
    <div
      id={`${accordionId}-details`}
      role="region"
      aria-labelledby={`${accordionId}-summary`}
      className={`px-4 py-2 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};
