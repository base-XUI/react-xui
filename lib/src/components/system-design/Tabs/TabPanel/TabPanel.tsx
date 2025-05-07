import { TabPanelProps } from "./TabPanel.types";
import clsx from "clsx";

export const TabPanel = ({
  children,
  value,
  activeValue,
  hidden,
  className,
  ...props
}: TabPanelProps) => {
  const isHidden = hidden || value !== activeValue;

  if (isHidden) return null;

  return (
    <div
      role="tabpanel"
      aria-hidden={isHidden}
      className={clsx("p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};
