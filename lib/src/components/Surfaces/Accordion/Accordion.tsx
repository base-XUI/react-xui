import React from "react";
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
  slots,
  ref,
  ...rest
}: AccordionProps<C>) => {
  const Component = component || "div";
  //check if state is controlled or uncontrolled
  const isControlled = expanded !== undefined;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(defaultExpanded);
  const isOpen = isControlled ? expanded : isExpanded;
  // Support both boolean and string for expanded
  // let isOpen: boolean;
  // if (isControlled) {
  //   if (typeof expanded === "boolean") {
  //     isOpen = expanded;
  //   } else if (typeof expanded === "string") {
  //     isOpen = expanded === id;
  //   } else {
  //     isOpen = false;
  //   }
  // } else {
  //   isOpen = isExpanded;
  // }

  const handleExpansion =
    (panel: string | boolean) => (event: React.SyntheticEvent) => {
      if (disabled) return;
      if (isControlled) {
        if (typeof expanded === "string") {
          // Pass the next expanded value (panel  or false)
          onChange?.(event, expanded === panel ? false : true);
        } else {
          onChange?.(event, !expanded);
        }
      } else {
        setIsExpanded((prev) => (onChange?.(event, !prev), !prev));
      }
    };

  const content = (
    <div
      className={`w-100 border-gray-300 ${!disableGutters && isOpen ? "my-3" : "my-0"} ${className}`}
      id={id}
    >
      {React.Children.map(children, (child: any) =>
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
          expanded: isOpen,
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
