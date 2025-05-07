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
  const {
    value: selectedValue,
    setValue,
    textColor,
    indicatorColor,
  } = useTabsContext();
  const isSelected = value === selectedValue;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => setValue(value)}
      className={clsx(
        "flex items-center justify-center px-4 py-2 transition-colors outline-none",
        "hover:bg-gray-100 focus:bg-gray-100",
        isSelected && [
          `text-${textColor === "inherit" ? indicatorColor : textColor}`,
          "border-b-2",
          `border-${indicatorColor}`,
        ],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label || children}
    </button>
  );
};
