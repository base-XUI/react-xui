import React from "react";
import { TooltipProps, TooltipComponent } from "./Tooltip.types";
import { tooltipVariants } from "./variants";

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
  ref: React.Ref<Element>,
) => {
  const [open, setOpen] = React.useState(false);
  const Component = (as || "span") as React.ElementType;
  const tooltipId = id || `tooltip-${Math.random().toString(36).slice(2, 8)}`;

  const handleEvent =
    (callback?: (event: React.SyntheticEvent) => void) =>
      (event: React.SyntheticEvent) => {
        callback?.(event);
      };

  const openTooltip = (event: React.SyntheticEvent) => {
    setOpen(true);
    onOpen?.(event);
  };

  const closeTooltip = (event: React.SyntheticEvent) => {
    setOpen(false);
    onClose?.(event);
  };
  console.log(tooltipVariants({ arrow, placement, interactive, color }), "oiwqeudfgv")
  return (
    <Component
      ref={ref}
      onMouseEnter={
        !disableHoverListener ? handleEvent(openTooltip) : undefined
      }
      onMouseLeave={
        !disableHoverListener ? handleEvent(closeTooltip) : undefined
      }
      onFocus={!disableFocusListener ? handleEvent(openTooltip) : undefined}
      onBlur={!disableFocusListener ? handleEvent(closeTooltip) : undefined}
      aria-describedby={!describeChild ? tooltipId : undefined}
      aria-label={
        describeChild && typeof title === "string" ? title : undefined
      }
      className={className}
      {...props}
    >
      {children}
      {open && title && (
        <div
          id={tooltipId}
          role="tooltip"
          data-testid="tooltip" // For Cypress test targeting
          data-arrow={arrow || undefined}
          data-color={color || undefined}
          data-placement={placement || undefined}
          className={tooltipVariants({ arrow, placement, interactive, color })}
        >
          {title}
        </div>
      )}
    </Component>
  );
};

// 💡 This retains proper generic typing
export const Tooltip = React.forwardRef(TooltipInner) as TooltipComponent;

Tooltip.displayName = "Tooltip";
