import React, { useState } from "react";
import { tooltipVariants } from "./variants";
import { TooltipProps } from "./Tooltip.types";

export const Tooltip = (
    <C extends React.ElementType = "span">(
        {
            as,
            children,
            title,
            arrow = false,
            placement = "bottom",
            // open,
            onOpen,
            onClose,
            disableHoverListener = false,
            disableFocusListener = false,
            disableTouchListener = false,
            describeChild = false,
            id,
            className,
            ...props
        }: TooltipProps<C>,
        ref: React.Ref<Element>
    ) => {
        const [open, setopen] = useState(false)
        const Component = (as || "span") as React.ElementType;
        const tooltipId = id || `tooltip-${Math.random().toString(36).slice(2, 8)}`;

        const handleEvent =
            (callback?: (event: React.SyntheticEvent) => void) =>
                (event: React.SyntheticEvent) =>
                    callback?.(event);
        function openTooltip(event: React.SyntheticEvent) {
            setopen(true)
            onOpen?.(event)
        }
        function closeTooltip(event: React.SyntheticEvent) {
            setopen(false)
            onClose?.(event)
        }

        return (
            <Component
                ref={ref}
                onMouseEnter={!disableHoverListener ? handleEvent(openTooltip) : undefined}
                onMouseLeave={!disableHoverListener ? handleEvent(closeTooltip) : undefined}
                onFocus={!disableFocusListener ? handleEvent(onOpen) : undefined}
                onBlur={!disableFocusListener ? handleEvent(onClose) : undefined}
                aria-describedby={!describeChild ? tooltipId : undefined}
                aria-label={describeChild && typeof title === "string" ? title : undefined}
                className={className}
                {...props}
            >
                {children}
                {open && title && (
                    <div
                        id={tooltipId}
                        role="tooltip"
                        className={tooltipVariants({ arrow, placement })}
                    >
                        {title}
                    </div>
                )}
            </Component>
        );
    }
) as <C extends React.ElementType = "span">(
    props: TooltipProps<C> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;
