import React from "react";

type SlotProps<T extends React.ElementType> = {
  children: React.ReactElement<React.ComponentProps<T>, T>;
} & React.HTMLAttributes<HTMLElement>;

export const Slot = React.forwardRef(
  <T extends React.ElementType = "div">(
    { children, ...props }: SlotProps<T>,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const childProps = children.props as React.ComponentPropsWithRef<T>;
    const childRef = (
      children as React.ReactElement<React.ComponentPropsWithRef<T>> & {
        ref?: React.Ref<HTMLElement>;
      }
    ).ref;

    return React.cloneElement(children, {
      ...props,
      ...childProps,
      ref: ref
        ? (mergedRef: HTMLElement) => {
            if (typeof ref === "function") ref(mergedRef);
            else if (ref) ref.current = mergedRef;
            if (typeof childRef === "function") childRef(mergedRef);
            else if (childRef) childRef.current = mergedRef;
          }
        : childRef,
    });
  },
);

Slot.displayName = "Slot";
