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
  // summary btn style
  const summaryClass = cn(
    "flex items-center w-full px-1 py-3 text-left text-sm font-semibold transition-all",
    disabled ? "cursor-default opacity-50" : "cursor-pointer",
    classes?.summary?.btn || "",
  );
  //expand icon style
  const expandIconClass = cn(
    "transition-transform",
    expanded ? "rotate-180" : "",
    classes?.summary?.expandIcon || "",
  );
  //content of summary style
  const contentClass = cn("flex-1", classes?.summary?.content || "");
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
      <span className={contentClass}> {children}</span>
      <span className={expandIconClass}>{expandIcon}</span>
    </button>,
  );
};
