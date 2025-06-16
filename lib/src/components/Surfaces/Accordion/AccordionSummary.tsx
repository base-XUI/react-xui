import React from "react";
import { ChevronDown } from "lucide-react";
import { AccordionProps } from "./Accordion.types";
import { cn } from "@/utils/cn";
export const AccordionSummary = <C extends React.ElementType = "h3">({
  children,
  expanded,
  onToggle,
  disabled,
  expandIcon = <ChevronDown className="stroke-muted-foreground" size={18} />,
  id,
  slots,
  classes,
}: AccordionProps<C>) => {
  //heading of summary
  const Heading = slots?.heading?.component || "h3";
  const summaryClass = cn(
    "flex w-full justify-between px-1 py-3 text-left text-sm font-semibold transition-all",
    disabled ? "cursor-default opacity-50" : "cursor-pointer",
    classes?.summary,
  );
  return React.createElement(
    Heading,
    {},
    <button
      type="button"
      className={summaryClass}
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={`${id}-details`}
      id={`${id}-summary`}
    >
      <span> {children}</span>
      <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
        {expandIcon}
      </span>
    </button>,
  );
};
