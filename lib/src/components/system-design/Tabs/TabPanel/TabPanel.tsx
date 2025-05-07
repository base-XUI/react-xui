import React from "react";
import clsx from "clsx";
import { useTabsContext } from "../Tabs";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

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

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      aria-hidden={!isSelected}
      className={clsx("p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};
