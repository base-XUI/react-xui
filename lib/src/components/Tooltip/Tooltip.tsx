import React from "react";
import { TooltipProps, TooltipComponent } from "./Tooltip.types";
import { tooltipVariants } from "./variants";
import { cn } from "@/utils/cn";

const TooltipInner = <C extends React.ElementType = "span">(
  {
    as,
    children,
    title,
    arrow = false,
    placement = "bottom",
    onOpen,
    onClose,
    disableHoverListener = false,
    disableFocusListener = false,
    disableTouchListener = false,
    describeChild = false,
    id,
    className,
    interactive = false,
    color = "default",
    ...props
  }: TooltipProps<C>,
  ref: React.Ref<Element>
) => {
  const [open, setOpen] = React.useState(false);
  const Component = (as || "span") as React.ElementType;
  const tooltipId = id || `tooltip-${Math.random().toString(36).slice(2, 8)}`;

  const openTooltip = (e: React.SyntheticEvent) => {
    setOpen(true);
    onOpen?.(e);
  };

  const closeTooltip = (e: React.SyntheticEvent) => {
    setOpen(false);
    onClose?.(e);
  };

  return (
    <Component
      ref={ref}
      onMouseEnter={!disableHoverListener ? openTooltip : undefined}
      onMouseLeave={!disableHoverListener ? closeTooltip : undefined}
      onFocus={!disableFocusListener ? openTooltip : undefined}
      onBlur={!disableFocusListener ? closeTooltip : undefined}
      aria-describedby={!describeChild ? tooltipId : undefined}
      aria-label={describeChild && typeof title === "string" ? title : undefined}
      className={cn(
        "relative text-center w-fit", className)}
      {...props}
    >
      {children}
      {open && title && (
        <div
          id={tooltipId}
          role="tooltip"
          data-testid="tooltip"
          data-arrow={arrow ? "true" : undefined}
          data-color={color || "default"}
          data-placement={placement}
          aria-live={interactive ? "polite" : undefined}
          className={cn(
            "p-[7px] whitespace-nowrap  ",
            tooltipVariants({ arrow, placement, interactive, color })
          )}
        >
          {title}
        </div>
      )}
    </Component>
  );
};

export const Tooltip = React.forwardRef(TooltipInner) as TooltipComponent;
Tooltip.displayName = "Tooltip";
