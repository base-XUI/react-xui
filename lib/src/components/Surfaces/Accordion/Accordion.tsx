import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { adaptPropsForA11y } from "@/utils/a11y";
import { AccordionProps } from "./Accordion.types";
import { accordionVariants } from "./variants";
import { Typography } from "@/components/system-design/Typography";

const Accordion = <C extends React.ElementType = "div">({
  component,
  children,
  className,
  defaultExpanded,
  expanded,
  disabled,
  disableGutters,
  square,
  onChange,
  title,
  id,
  ref,
  ...rest
}: AccordionProps<C>) => {
  const Component = component || "div";
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = expanded !== undefined;

  const isOpen = isControlled ? expanded : internalExpanded;

  const handleToggle = (event: React.MouseEvent) => {
    if (disabled) return;

    const newExpanded = !isOpen;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onChange?.(event, newExpanded);
  };

  const content = (
    <div
      className={`overflow-hidden rounded-md border border-gray-300 ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
      id={id}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          isOpen,
          onToggle: handleToggle,
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
