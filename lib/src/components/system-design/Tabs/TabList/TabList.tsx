import React, { useState, useEffect, useRef } from "react";
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
  const { orientation, variant, value } = useTabsContext();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  });

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
      const selectedTab = tabs[selectedIndex] as HTMLElement;
      const tabRect = selectedTab.getBoundingClientRect();
      const parentRect = tabsRef.current.getBoundingClientRect();

      if (orientation === "vertical") {
        setIndicatorStyle({
          left: 0,
          width: 2,
          top: tabRect.top - parentRect.top,
          height: tabRect.height,
        });
      } else {
        setIndicatorStyle({
          left: tabRect.left - parentRect.left,
          width: tabRect.width,
          top: 0,
          height: 2,
        });
      }
    }
  }, [value, orientation]);

  return (
    <div
      ref={tabsRef}
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
      {orientation === "vertical" ? (
        <span
          className="bg-primary absolute left-0 w-0.5 transition-all duration-300"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
          }}
        />
      ) : (
        <span
          className="bg-primary absolute bottom-0 h-0.5 transition-all duration-300"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}
    </div>
  );
};
