import React, { useEffect, useRef } from "react";
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
  const { orientation, value } = useTabsContext();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current) return;

    const tabs = Array.from(tabsRef.current.children).filter(
      (child) =>
        child instanceof HTMLElement && child.getAttribute("role") === "tab",
    );

    let selectedIndex = -1;
    tabs.forEach((tab, index) => {
      if (
        tab instanceof HTMLElement &&
        tab.getAttribute("aria-selected") === "true"
      ) {
        selectedIndex = index;
      }
    });

    if (selectedIndex >= 0 && selectedIndex < tabs.length) {
    }
  }, [value, orientation]);

  return (
    <div
      ref={tabsRef}
      className={clsx(
        "bg-muted inline-flex h-10 items-center justify-center rounded-md p-1",
        orientation === "vertical"
          ? "h-full flex-col rounded-md"
          : "h-10 rounded-md",
        className,
      )}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
};
