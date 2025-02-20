import React from "react";

interface SlotProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "ref" | "children"> {
  children: React.ReactElement;
}

function setRef<T>(
  ref: React.ForwardedRef<T> | undefined,
  instance: T | null,
): void {
  if (typeof ref === "function") {
    ref(instance);
  } else if (ref !== null && ref !== undefined) {
    // Only set current if ref object exists
    ref.current = instance;
  }
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...props },
  forwardedRef,
) {
  const refCallback = React.useCallback(
    (element: HTMLElement | null) => {
      // Handle forwarded ref
      setRef(forwardedRef, element);

      // Handle children's ref
      const childrenRef = React.isValidElement(children)
        ? (children as unknown as { ref?: React.ForwardedRef<HTMLElement> }).ref
        : undefined;

      if (childrenRef) {
        setRef(childrenRef, element);
      }
    },
    [children, forwardedRef],
  );

  if (!React.isValidElement(children)) {
    return null;
  }

  const childProps = children.props as Record<string, unknown>;
  const combinedProps = {
    ...childProps,
    ...props,
    ref: refCallback,
  };

  return React.cloneElement(children, combinedProps);
});

Slot.displayName = "Slot";
