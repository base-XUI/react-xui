import React, { isValidElement } from "react";
import { TabListProps } from "./TabList.types";
import clsx from "clsx";

type TabChildProps = {
  value?: any;
  onClick?: (e: React.SyntheticEvent) => void;
  selected?: boolean;
};

export const TabList = ({
  children,
  value,
  onChange,
  orientation = "horizontal",
  variant = "standard",
  className,
  ...props
}: TabListProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={clsx(
        "flex",
        isHorizontal ? "flex-row space-x-2" : "flex-col space-y-2",
        variant === "scrollable" && "overflow-x-auto",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!isValidElement<TabChildProps>(child)) return child;

        const childValue = child.props.value;

        return React.cloneElement(child, {
          onClick: (e: React.SyntheticEvent) => onChange?.(e, childValue),
          selected: childValue === value,
        });
      })}
    </div>
  );
};
