import React from "react";

export type AsProp<C extends React.ElementType> = {
  component?: C;
};

export type PropsWithAs<C extends React.ElementType, Props = object> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (Props & AsProp<C>)>;

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object,
> = PropsWithAs<C, Props> & {
  ref?: React.ComponentPropsWithRef<C>["ref"];
};

export type PolymorphicComponent<
  DefaultElement extends React.ElementType,
  Props = object,
> = {
  <C extends React.ElementType = DefaultElement>(
    props: PolymorphicComponentProps<C, Props> & {
      ref?: React.ComponentPropsWithRef<C>["ref"];
    },
  ): React.ReactElement;
  displayName?: string;
};

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];
