import React from "react";
import { cn } from "@/utils/cn";
import { type LinkProps } from "./Link.types";
import { LinkVariants } from "./variants";
import { adaptPropsForA11y } from "@/utils/a11y";
import { Button } from "@/components/inputs/Button";

const Link = <C extends React.ElementType = "a">({
  component,
  className,
  variant,
  color,
  children,
  ref,
  underline,
  target,
  rel,
  ...rest
}: LinkProps<C>) => {
  const Component = component || "a";
  //check if component is a Button
  const isButton = Component === Button;

  // Use a11y utility to handle accessibility attributes
  const a11yProps = adaptPropsForA11y(
    {
      target,
      rel,
      ...rest,
    },
    typeof Component === "string" ? Component : "a",
  );

  return (
    <Component
      ref={ref}
      {...rest}
      className={cn(
        LinkVariants({
          variant,
          color: isButton ? "inherit" : color,
          underline,
          className,
        }),
      )}
      {...a11yProps}
    >
      {children}
    </Component>
  );
};

Link.displayName = "Link";

export { Link };
