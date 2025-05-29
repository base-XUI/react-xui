import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { adaptPropsForA11y } from "@/utils/a11y";
import { AccordionProps } from "./Accordion.types";
import { accordionVariants } from "./variants";

const Accordion = <C extends React.ElementType = "div">({
  component,
  children,
  className,
  defaultExpanded = false,
  expanded,
  disabled,
  disableGutters,
  square,
  onChange,
  id,
  ref,
  ...rest
}: AccordionProps<C>) => {
  const Component = component || "div";
  // const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  // const isControlled = expanded !== undefined;

  // const isOpen = isControlled ? expanded : internalExpanded;

  // const handleToggle = (event: React.MouseEvent) => {
  //   console.log("defaultExpanded5555", defaultExpanded, expanded, isOpen);
  //   if (disabled) return;
  //   const newExpanded = !isOpen;
  //   if (!isControlled) {
  //     setInternalExpanded(newExpanded);
  //   }

  //   onChange?.(event, newExpanded);
  // };
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const handleExpansion = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const content = (
    <div
      className={`w-100 border-gray-300 ${!disableGutters && (isExpanded || defaultExpanded) ? "my-3" : "my-0"} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
      id={id}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          expanded: isExpanded,
          handleToggle: handleExpansion,
          disabled,
          accordionId: id,
        }),
      )}
    </div>
  );

  // Use a11y utility to handle accessibility attributes
  const a11yProps = adaptPropsForA11y(
    { ...rest },
    typeof Component === "string" ? Component : "div",
  );

  return (
    <Component
      ref={ref}
      className={cn(
        accordionVariants({
          expanded: isExpanded,
          disabled,
          disableGutters,
          square,
          className,
        }),
      )}
      {...a11yProps}
    >
      {content}
    </Component>
  );
};

Accordion.displayName = "Accordion";
export { Accordion };
