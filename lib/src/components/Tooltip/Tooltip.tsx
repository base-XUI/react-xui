import React from "react";
import { TooltipProps, TooltipComponent } from "./Tooltip.types";
import { tooltipVariants } from "./variants";
import { cn } from "@/utils/cn";

const TooltipInner = <C extends React.ElementType = "span">(
  props: TooltipProps<C>,
  ref: React.Ref<Element>
) => {
  const [open, setOpen] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number } | null>(null);
  const lastOpenTimestampRef = React.useRef(0);

  const timers = React.useRef({
    enter: null as NodeJS.Timeout | null,
    leave: null as NodeJS.Timeout | null,
    touchEnter: null as NodeJS.Timeout | null,
    touchLeave: null as NodeJS.Timeout | null,
  });

  const {
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
    disableTouchListener = false,
    enterDelay,
    enterNextDelay,
    enterTouchDelay,
    leaveDelay,
    leaveTouchDelay,
    followCursor = false,
    color = "primary",
    slots = {},
    components = {},
    slotProps = {},
    ...rest
  } = props;

  const Component = (as ?? "span") as React.ElementType;
  const TooltipBox = slots.tooltip ?? components.Tooltip ?? "div";
  const tooltipId = id ?? `tooltip-${Math.random().toString(36).slice(2, 8)}`;

  const clearTimers = () => {
    Object.values(timers.current).forEach((t) => t && clearTimeout(t));
    timers.current = { enter: null, leave: null, touchEnter: null, touchLeave: null };
  };

  const shouldOpen = (type: "focus" | "hover" | "touch") => {
    if (disabled) return false;
    if (type === "focus") return !disableFocusListener;
    if (type === "hover") return !disableHoverListener;
    if (type === "touch") return !disableTouchListener;
    return true;
  };

  const openTooltip = (e: React.SyntheticEvent) => {
    clearTimers();
    setOpen(true);
    lastOpenTimestampRef.current = Date.now();
    onOpen?.(e);
  };

  const closeTooltip = (e?: React.SyntheticEvent) => {
    clearTimers();
    setOpen(false);
    if (e) {
      onClose?.(e);
    } else {
      // Provide a synthetic event if none is available
      onClose?.({} as React.SyntheticEvent);
    }
  };

  const handleOpenDelayed = (e: React.SyntheticEvent, type: "hover" | "focus") => {
    if (!shouldOpen(type)) return;

    clearTimers();

    const now = Date.now();
    const timeSinceLast = now - lastOpenTimestampRef.current;
    const delay = timeSinceLast < 1000 ? enterNextDelay ?? 0 : enterDelay ?? 100;

    timers.current.enter = setTimeout(() => openTooltip(e), delay);
  };

  const handleCloseDelayed = (e: React.SyntheticEvent, type: "hover" | "focus") => {
    if (!shouldOpen(type)) return;

    clearTimers();

    const delay = leaveDelay ?? 0;
    if (delay > 0) {
      timers.current.leave = setTimeout(() => closeTooltip(e), delay);
    } else {
      closeTooltip(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!shouldOpen("touch")) return;

    clearTimers();
    const delay = enterTouchDelay ?? 700;

    timers.current.touchEnter = setTimeout(() => {
      openTooltip(e);
      timers.current.touchEnter = null;
    }, delay);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (timers.current.touchEnter) {
      clearTimeout(timers.current.touchEnter);
      timers.current.touchEnter = null;
    }

    const delay = leaveTouchDelay ?? 1500;
    if (delay > 0) {
      timers.current.touchLeave = setTimeout(() => closeTooltip(e), delay);
    } else {
      closeTooltip(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (followCursor) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
  };

  const followCursorStyle = followCursor && cursorPos
    ? {
      position: "fixed",
      top: cursorPos.y + 10,
      left: cursorPos.x + 10,
      transform: "none",
    }
    : undefined;

  // Helper for conditional event handler assignment
  const withCondition = <T extends (...args: any[]) => void>(
    disabled: boolean,
    handler: T
  ): T | undefined => (!disabled ? handler : undefined);

  return (
    <Component
      ref={ref}
      onMouseEnter={(e: React.MouseEvent<Element>) => handleOpenDelayed(e, "hover")}
      onMouseLeave={(e: React.MouseEvent<Element>) => handleCloseDelayed(e, "hover")}
      onFocus={(e: React.FocusEvent<Element>) => handleOpenDelayed(e, "focus")}
      onBlur={(e: React.FocusEvent<Element>) => handleCloseDelayed(e, "focus")}
      onTouchStart={withCondition(
        disableTouchListener,
        handleTouchStart as React.EventHandler<React.TouchEvent<Element>>
      )}
      onTouchEnd={withCondition(
        disableTouchListener,
        handleTouchEnd as React.EventHandler<React.TouchEvent<Element>>
      )}
      onTouchCancel={withCondition(
        disableTouchListener,
        handleTouchEnd as React.EventHandler<React.TouchEvent<Element>>
      )}
      onMouseMove={handleMouseMove as React.MouseEventHandler<Element>}
      className={cn("relative w-fit text-center", className)}
      {...(rest as React.ComponentPropsWithoutRef<C>)}
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
            tooltipVariants({ arrow, placement, disableInteractive, color })
          )}
          style={followCursorStyle}
          {...(slotProps.tooltip as React.HTMLAttributes<HTMLElement>)}
        >
          {title}
        </TooltipBox>
      )}
    </Component>
  );
};

export const Tooltip = React.forwardRef(TooltipInner) as TooltipComponent;
Tooltip.displayName = "Tooltip";
