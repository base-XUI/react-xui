import * as React from "react";

export type ElementType = React.ElementType<any>;

export type AsProp<E extends ElementType = ElementType> = {
  as?: E;
};

type PropsToOmit<E extends ElementType, P> = keyof (AsProp<E> & P);

export type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

export type PolymorphicComponentProp<
  E extends ElementType,
  Props = {}
> = Props &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>>;

export type PolymorphicComponentPropWithRef<
  E extends ElementType,
  Props = {}
> = PolymorphicComponentProp<E, Props> & { ref?: PolymorphicRef<E> };

// Type to infer proper component props
export type ComponentProps<E extends ElementType> = React.ComponentProps<E>;
