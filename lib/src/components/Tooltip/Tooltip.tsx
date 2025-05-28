import React from "react";
import { TooltipProps, TooltipComponent } from "./Tooltip.types";
import { tooltipVariants } from "./variants";
import { cn } from "@/utils/cn";

const TooltipInner = <C extends React.ElementType = "span">(
  {
    as,
    children,
    title,
    arrow = true,
    disabled = false,
    placement = "top",
    onOpen,
    onClose,
    id,
    className,
    disableInteractive = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableTouchListener = false, // placeholder
    color = "primary",
    slots = {},
    components = {},
    slotProps = {},
    ...props
  }: TooltipProps<C>,
  ref: React.Ref<Element>,
) => {
  const [open, setOpen] = React.useState(false);
  const Component = (as || "span") as React.ElementType;
  const tooltipId = id || `tooltip-${Math.random().toString(36).slice(2, 8)}`;

  // Utility to decide if tooltip can open based on event type & flags
  const shouldOpen = (eventType: "focus" | "hover" | "touch") => {
    if (disabled) return false;
    switch (eventType) {
      case "focus":
        return !disableFocusListener;
      case "hover":
        return !disableHoverListener;
      case "touch":
        return !disableTouchListener;
      default:
        return true;
    }
  };

  const openTooltip = (e: React.SyntheticEvent) => {
    setOpen(true);
    onOpen?.(e);
  };

  const closeTooltip = (e: React.SyntheticEvent) => {
    setOpen(false);
    onClose?.(e);
  };

  const TooltipBox = slots.tooltip ?? components.Tooltip ?? "div";

  return (
    <Component
      ref={ref}
      onMouseEnter={shouldOpen("hover") ? openTooltip : undefined}
      onMouseLeave={!disabled ? closeTooltip : undefined}
      onFocus={shouldOpen("focus") ? openTooltip : undefined}
      onBlur={!disabled ? closeTooltip : undefined}
      className={cn("relative w-fit text-center", className)}
      {...props}
    >
      {children}
      {open && title && (
        <TooltipBox
          id={tooltipId}
          role="tooltip"
          data-testid="tooltip"
          data-arrow={arrow ? "true" : undefined}
          data-color={color}
          data-placement={placement}
          aria-live={disableInteractive ? "polite" : undefined}
          className={cn(
            "p-[7px] whitespace-nowrap",
            tooltipVariants({ arrow, placement, disableInteractive, color }),
          )}
          {...slotProps.tooltip}
        >
          {title}
        </TooltipBox>
      )}
    </Component>
  );
};

export const Tooltip = React.forwardRef(TooltipInner) as TooltipComponent;
Tooltip.displayName = "Tooltip";
