import React from "react";
import { ChevronDown } from "lucide-react";
import { AccordionProps } from "./Accordion.types";
import { twMerge } from "tailwind-merge";
export const AccordionSummary = <C extends React.ElementType = "h3">({
  children,
  expanded,
  handelChange,
  disabled,
  expandIcon = <ChevronDown color="#71717A" size={18} />,
  id,
  slots,
  classes,
}: AccordionProps<C>) => {
  //heading of summary
  const Heading = slots?.heading?.component || "h3";
  console.log("first", slots?.heading?.component);
  const summaryClass = twMerge(
    "flex w-full justify-between px-4 py-3 text-left text-sm font-semibold transition-all",
    disabled ? "cursor-default opacity-50" : "cursor-pointer",
    classes?.summary,
  );
  return React.createElement(
    Heading,
    {},
    <button
      type="button"
      className={summaryClass}
      onClick={handelChange}
      aria-expanded={expanded}
      aria-controls={`${id}-details`}
      id={`${id}-summary`}
    >
      {children}
      <span
        className={`mr-2 transition-transform ${expanded ? "rotate-180" : ""}`}
      >
        {expandIcon}
      </span>
    </button>,
  );
};
