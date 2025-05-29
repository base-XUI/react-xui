import React from "react";
import { ChevronUp } from "lucide-react";
import { AccordionProps } from "./Accordion.types";

export const AccordionSummary = <C extends React.ElementType = "h3">({
  children,
  expanded,
  handleToggle,
  expandIcon,
  id,
}: AccordionProps<C>) => {
  return (
    <h3>
      <button
        type="button"
        className="flex w-full cursor-pointer justify-between bg-blue-100 px-4 py-3 text-left font-semibold"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-details`}
        id={`${id}-summary`}
      >
        <span>{children}</span>
        <span
          className={`mr-2 transition-transform duration-150 ease-in-out ${expanded ? "rotate-180" : ""}`}
        >
          {expandIcon ? expandIcon : <ChevronUp />}
        </span>{" "}
      </button>
    </h3>
  );
};
