import React from "react";
import { AccordionProps } from "./Accordion.types";

export const AccordionSummary = <C extends React.ElementType = "button">({
  children,
  isOpen,
  disabled,
  onToggle,
  accordionId,
}: AccordionProps<C>) => {
  return (
    <button
      type="button"
      className="w-full bg-gray-100 p-4 text-left font-semibold transition hover:bg-gray-200"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`${accordionId}-details`}
      id={`${accordionId}-summary`}
      disabled={disabled}
    >
      <span>{children}</span>
      <span>{isOpen ? "-" : "+"}</span>
    </button>
  );
};
