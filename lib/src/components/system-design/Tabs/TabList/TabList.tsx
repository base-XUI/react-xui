import React from "react";
import clsx from "clsx";
import { useTabsContext } from "../Tabs";
import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

type TabListBaseProps = {
  children?: React.ReactNode;
};

type TabListProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, TabListBaseProps>;
type TabListComponent = PolymorphicComponent<TabListBaseProps, "div">;

export const TabList: TabListComponent = <C extends React.ElementType = "div">({
  children,
  className,
  ...props
}: TabListProps<C>) => {
  const { orientation, variant } = useTabsContext();

  return (
    <div
      className={clsx(
        "relative flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        variant === "fullWidth" && "w-full",
        className,
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};
