import React from "react";
import { cn } from "@/utils/cn";
import { AccordionProps } from "./Accordion.types";
import { accordionVariants } from "./variants";
import { twMerge } from "tailwind-merge";
const Accordion = <C extends React.ElementType = "div">({
  component,
  children,
  classes,
  defaultExpanded = false,
  expanded,
  disabled,
  disableGutters,
  square,
  onChange,
  id = `accordion-${Math.random().toString(36).substr(2, 9)}`, // Generate a unique id if not provided
  slots,
  ref,
  ...rest
}: AccordionProps<C>) => {
  const Component = component || "div";
  //check if state is controlled or uncontrolled
  const isControlled = expanded !== undefined;
  //states for expanded or not
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  // Determine initial open state for uncontrolled mode
  let isOpen: boolean = isExpanded === true || defaultExpanded === true; // Support both boolean and string for expanded
  if (isControlled) {
    if (typeof expanded === "boolean") {
      isOpen = expanded;
    } else if (typeof expanded === "string") {
      isOpen = expanded === id;
    } else {
      isOpen = false;
    }
  }
  //handel expansion
  const handleExpansion = (event: React.SyntheticEvent) => {
    if (disabled) return;
    if (isControlled) {
      if (typeof expanded === "string") {
        // Pass the next expanded value (panel id or false)
        onChange?.(event, expanded === id ? false : true);
      } else {
        onChange?.(event, !expanded);
      }
    } else {
      setIsExpanded((prev) => (onChange?.(event, !prev), !prev));
    }
  };
  const rootClass = twMerge(
    "w-100",
    !disableGutters && isOpen ? "my-3" : "my-0",
    classes?.root,
  );

  const content = (
    <div className={rootClass} id={id}>
      {React.Children.map(
        children,
        (
          child: any, //eslint-disable-line
        ) =>
          React.cloneElement(child, {
            expanded: isOpen,
            handelChange: handleExpansion,
            disabled,
            id,
            slots,
          }),
      )}
    </div>
  );

  return (
    <Component
      ref={ref}
      className={cn(
        accordionVariants({
          expanded: isOpen,
          disabled,
          disableGutters,
          square,
        }),
      )}
      {...rest}
    >
      {content}
    </Component>
  );
};

Accordion.displayName = "Accordion";
export { Accordion };
