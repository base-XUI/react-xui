import React from "react";
import clsx from "clsx";
import { TabProps } from "./Tab.types";
import { useTabsContext } from "../Tabs";

export const Tab = ({
  value,
  label,
  icon,
  iconPosition = "start",
  disabled = false,
  selected = false,
  onClick,
  children,
  className,
  ...props
}: TabProps) => {
  const { value: selectedValue, setValue } = useTabsContext();

  const isSelected = selected || selectedValue === value;

  const handleClick = (e: React.SyntheticEvent) => {
    if (disabled) return;
    setValue(value);
    onClick?.(e);
  };

  return (
    <div
      role="tab"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      className={clsx(
        "flex cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium",
        isSelected
          ? "bg-primary text-white"
          : "bg-transparent text-gray-600 hover:bg-gray-100",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "start" && <span className="mr-2">{icon}</span>}
      {label || children}
      {icon && iconPosition === "end" && <span className="ml-2">{icon}</span>}
    </div>
  );
};
