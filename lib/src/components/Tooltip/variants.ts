    import { cva } from "class-variance-authority";

    // Define variant types
    export type TooltipPlacement =
        "auto-end"
        | "auto-start"
        | "auto"
        | "bottom-end"
        | "bottom-start"
        | "bottom"
        | "left-end"
        | "left-start"
        | "left"
        | "right-end"
        | "right-start"
        | "right"
        | "top-end"
        | "top-start"
        | "top";


    export type TooltipColor =
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "warning"
        | "info";

    export const tooltipVariantsConfig = {
        variants: {
            color: {
                default: "bg-gray-800 text-white",
                primary: "bg-primary text-primary-foreground",
                secondary: "bg-secondary text-secondary-foreground",
                success: "bg-success text-success-foreground",
                error: "bg-error text-error-foreground",
                warning: "bg-warning text-warning-foreground",
                info: "bg-info text-info-foreground",
            },
            placement: {
                auto: "", // or assign a default style
                "auto-start": "",
                "auto-end": "",
                top: "translate-y-[-100%]",
                bottom: "translate-y-[100%]",
                left: "translate-x-[-100%]",
                right: "translate-x-[100%]",
                "top-start": "translate-y-[-100%] left-0",
                "top-end": "translate-y-[-100%] right-0",
                "bottom-start": "translate-y-[100%] left-0",
                "bottom-end": "translate-y-[100%] right-0",
                "left-start": "translate-x-[-100%] top-0",
                "left-end": "translate-x-[-100%] bottom-0",
                "right-start": "translate-x-[100%] top-0",
                "right-end": "translate-x-[100%] bottom-0",
            },
            arrow: {
                true: "before:content-[''] before:absolute before:w-2 before:h-2 before:rotate-45 before:bg-inherit",
            },
            interactive: {
                true: "pointer-events-auto",
                false: "pointer-events-none",
            },
        },
        defaultVariants: {
            color: "default" as TooltipColor,
            placement: "bottom" as TooltipPlacement,
            arrow: false,
            interactive: false,
        },
    };

    export const tooltipVariants = cva(
        "z-50 px-3 py-1.5 text-sm rounded shadow-md absolute transition-opacity duration-200",
        {
            variants: tooltipVariantsConfig.variants,
            defaultVariants: tooltipVariantsConfig.defaultVariants,
            compoundVariants: [
                {
                    arrow: true,
                    placement: "top",
                    className: "before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2",
                },
                {
                    arrow: true,
                    placement: "bottom",
                    className: "before:top-[-4px] before:left-1/2 before:-translate-x-1/2",
                },
                {
                    arrow: true,
                    placement: "left",
                    className: "before:right-[-4px] before:top-1/2 before:-translate-y-1/2",
                },
                {
                    arrow: true,
                    placement: "right",
                    className: "before:left-[-4px] before:top-1/2 before:-translate-y-1/2",
                },
            ],
        }
    );
