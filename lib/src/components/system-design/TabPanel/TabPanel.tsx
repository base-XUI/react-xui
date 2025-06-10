import React from "react";
import clsx from "clsx";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";
import { useTabsContext } from "../Tabs/Tabs";

type TabPanelBaseProps = {
  value: any;
  children?: React.ReactNode;
};

type TabPanelProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, TabPanelBaseProps>;
type TabPanelComponent = PolymorphicComponent<TabPanelBaseProps, "div">;

export const TabPanel: TabPanelComponent = <
  C extends React.ElementType = "div",
>({
  value,
  children,
  className,
  ...props
}: TabPanelProps<C>) => {
  const { value: selectedValue } = useTabsContext();
  const isSelected = value === selectedValue;

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      hidden={!isSelected}
      className={clsx(
        "ring-offset-background data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in mt-2",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      tabIndex={isSelected ? 0 : -1}
      {...props}
    >
      {children}
    </div>
  );
};
