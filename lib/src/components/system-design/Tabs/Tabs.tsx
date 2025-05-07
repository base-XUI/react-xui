import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
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

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = (): TabsContextValue => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs />");
  return ctx;
};

const validateChildren = (children: React.ReactNode) => {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      throw new Error("All children of Tabs must be valid React elements");
    }
  });
};

export const Tabs: TabsComponent = <C extends React.ElementType = "div">({
  children,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  orientation = "horizontal",
  variant = "standard",
  selectionFollowsFocus = false,
  indicatorColor = "primary",
  textColor = "inherit",
  centered = false,
  className,
  "aria-label": ariaLabel,
  ...props
}: TabsProps<C>): JSX.Element => {
  validateChildren(children);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const childArray = React.Children.toArray(children).filter(
    React.isValidElement,
  );
  const selectedIndex = childArray.findIndex(
    (child) => React.isValidElement(child) && child.props.value === value,
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: unknown) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(event, newValue);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = selectedIndex;
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = Math.min(childArray.length - 1, currentIndex + 1);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = childArray.length - 1;
        break;
      default:
        return;
    }

    if (
      nextIndex !== currentIndex &&
      React.isValidElement(childArray[nextIndex])
    ) {
      event.preventDefault();
      handleChange(event, childArray[nextIndex].props.value);
      if (selectionFollowsFocus) {
        const tabElement = document.querySelector(
          `[role="tab"][data-index="${nextIndex}"]`,
        ) as HTMLElement;
        tabElement?.focus();
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      value,
      setValue: (val: unknown) => {
        const event = new Event("change") as unknown as React.SyntheticEvent;
        handleChange(event, val);
      },
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
      <div className={clsx("flex flex-col", className)}>
        <div
          role="tablist"
          aria-orientation={orientation}
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          className={clsx(
            "relative flex",
            orientation === "vertical" ? "flex-row" : "flex-col",
            variant === "scrollable" && "scrollbar-thin overflow-x-auto",
            variant === "fullWidth" && "w-full",
            centered && "justify-center",
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
