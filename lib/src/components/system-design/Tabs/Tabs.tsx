import React, { useState, createContext, useContext } from "react";
import clsx from "clsx";
import { TabsProps } from "./Tabs.types";

type TabsContextValue = {
  value: any;
  setValue: (val: any) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs />");
  return ctx;
};

export const Tabs = <C extends React.ElementType = "div">({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  orientation = "horizontal",
  variant = "standard",
  selectionFollowsFocus,
  indicatorColor = "primary",
  textColor = "inherit",
  centered = false,
  className,
  ...props
}: TabsProps<C>) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? 0);

  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.SyntheticEvent, newValue: any) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e, newValue);
  };

  return (
    <TabsContext.Provider
      value={{ value, setValue: (val) => handleChange({}, val) }}
    >
      <div
        className={clsx(
          "flex w-full",
          orientation === "vertical" ? "flex-row" : "flex-col",
          variant === "scrollable" && "overflow-x-auto",
          centered && "justify-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};
