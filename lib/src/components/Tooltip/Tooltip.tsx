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
    color = "primary",
    slots = {},
    components = {}, // deprecated
    slotProps = {},
    ...props
  }: TooltipProps<C>,
  ref: React.Ref<Element>,
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

  // Use slots first, fallback to deprecated components, or default to <div>
  const TooltipBox = slots.tooltip ?? components.Tooltip ?? "div";

  return (
    <Component
      ref={ref}
      onMouseEnter={!disabled ? openTooltip : undefined}
      onMouseLeave={closeTooltip}
      onBlur={closeTooltip}
      onFocus={!disabled ? openTooltip : undefined}
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
