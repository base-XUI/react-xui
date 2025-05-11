import React from "react";
import clsx from "clsx";
import { useTabsContext } from "../Tabs";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

type TabBaseProps = {
  value: any;
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  children?: React.ReactNode;
};

type TabProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C, TabBaseProps>;
type TabComponent = PolymorphicComponent<TabBaseProps, "button">;

export const Tab: TabComponent = <C extends React.ElementType = "button">({
  value,
  disabled = false,
  icon,
  label,
  children,
  className,
  ...props
}: TabProps<C>) => {
  const { value: selectedValue, setValue, orientation } = useTabsContext();
  const isSelected = value === selectedValue;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => setValue(value)}
      data-state={isSelected ? "active" : "inactive"}
      data-orientation={orientation}
      className={clsx(
        "ring-offset-background inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        orientation === "vertical" && "w-full justify-start",
        className,
      )}
      tabIndex={isSelected ? 0 : -1}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label || children}
    </button>
  );
};
