import React from "react";
import { cn } from "@/utils/cn";
import { AccordionProps } from "./Accordion.types";
import { accordionVariants } from "./variants";
import { useId } from "react";

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
  slots,
  ref,
  ...rest
}: AccordionProps<C>) => {
  const Component = component || "div";
  const autoId = useId();

  //check if state is controlled or uncontrolled
  const isControlled = expanded !== undefined;
  //get id from props or generate one
  const id = rest.id || `accordion-${autoId}`;
  //states for expanded or not
  const [uncontrolledOpen, setUncontrolledOpen] =
    React.useState(defaultExpanded);

  const isOpen = isControlled
    ? typeof expanded === "string"
      ? expanded === id
      : expanded
    : uncontrolledOpen === true || defaultExpanded === true;
  //handel expansion
  const handleExpansion = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (disabled) return;
      if (isControlled) {
        if (typeof expanded === "string") {
          // Pass the next expanded value to onChange callback
          onChange?.(event, expanded);
        } else {
          onChange?.(event, !expanded);
        }
      } else {
        setUncontrolledOpen((prev) => (onChange?.(event, !prev), !prev));
      }
    },
    [disabled, isControlled, expanded, onChange],
  );
  // Define the root class based on the props
  const rootClass = cn(
    "w-full",
    !disableGutters && isOpen ? "my-3" : "my-0",
    classes?.root,
  );

  const content = (
    <div className={rootClass} id={id}>
      {React.Children.map(children, (child: React.ReactNode) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<any>, //eslint-disable-line
              {
                // Pass necessary props to child components
                expanded: isOpen,
                onToggle: handleExpansion,
                disabled,
                id,
                slots,
                classes,
              },
            )
          : child,
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
