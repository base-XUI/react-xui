import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  KeyboardEvent,
  SyntheticEvent,
} from "react";
import clsx from "clsx";
import { TabsProps, TabsComponent } from "./Tabs.types";

type TabsContextValue = {
  value: unknown;
  setValue: (val: unknown) => void;
  orientation: "horizontal" | "vertical";
  selectedIndex: number;
  variant: "standard" | "scrollable" | "fullWidth";
  indicatorColor: "primary" | "secondary";
  textColor: "inherit" | "primary" | "secondary";
};

interface TabProps {
  value: unknown;
  [key: string]: any;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = (): TabsContextValue => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs />");
  return ctx;
};

export const Tabs: TabsComponent = <C extends React.ElementType = "div">({
  children,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  orientation = "horizontal",
  variant = "standard",
  indicatorColor = "primary",
  textColor = "inherit",
  className,
  "aria-label": ariaLabel,
  ...props
}: TabsProps<C>) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const childArray = useMemo(
    () =>
      React.Children.toArray(children).filter(
        React.isValidElement,
      ) as React.ReactElement<TabProps>[],
    [children],
  );

  const selectedIndex = useMemo(
    () => childArray.findIndex((child) => child.props.value === value),
    [childArray, value],
  );

  const handleChange = useCallback(
    (event: SyntheticEvent | null, newValue: unknown) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(event as SyntheticEvent, newValue);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    let nextIndex = selectedIndex;
    const isRtl = document.dir === "rtl";

    switch (event.key) {
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = childArray.length - 1;
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          nextIndex = Math.max(0, selectedIndex + (isRtl ? 1 : -1));
        }
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          nextIndex = Math.min(
            childArray.length - 1,
            selectedIndex + (isRtl ? -1 : 1),
          );
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          nextIndex = Math.max(0, selectedIndex - 1);
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          nextIndex = Math.min(childArray.length - 1, selectedIndex + 1);
        }
        break;
      default:
        return;
    }

    if (nextIndex !== selectedIndex) {
      event.preventDefault();
      handleChange(event, childArray[nextIndex].props.value);
      const tabElement = document.querySelector(
        `[role="tab"][data-index="${nextIndex}"]`,
      ) as HTMLElement | null;
      tabElement?.focus();
    }
  };

  const contextValue = useMemo(
    () => ({
      value,
      setValue: (val: unknown) => handleChange(null, val),
      orientation,
      selectedIndex,
      variant,
      indicatorColor,
      textColor,
    }),
    [
      value,
      handleChange,
      orientation,
      selectedIndex,
      variant,
      indicatorColor,
      textColor,
    ],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={clsx(
          "w-full",
          orientation === "vertical" ? "flex" : "block",
          className,
        )}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
