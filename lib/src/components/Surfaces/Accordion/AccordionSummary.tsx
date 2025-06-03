import React from "react";
import { ChevronDown } from "lucide-react";
import { AccordionProps } from "./Accordion.types";

export const AccordionSummary = <C extends React.ElementType = "h3">({
  children,
  expanded,
  handelChange,
  disabled,
  expandIcon = <ChevronDown />,
  id,
  slots,
}: AccordionProps<C>) => {
  //heading of summary
  const Heading = slots?.heading?.component || "h3";
  return (
    <Heading>
      <button
        type="button"
        className={`flex w-full ${disabled ? "cursor-default opacity-50" : "cursor-pointer"} justify-between px-4 py-3 text-left font-semibold`}
        onClick={handelChange}
        aria-expanded={expanded}
        aria-controls={`${id}-details`}
        id={`${id}-summary`}
      >
        <span>{children}</span>
        <span
          className={`mr-2 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          {expandIcon}
        </span>
      </button>
    </Heading>
  );
};
