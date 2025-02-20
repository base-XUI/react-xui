import React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";

export type ButtonBaseProps = {
  loading?: boolean;
  loadingPosition?: "start" | "center" | "end";
  loadingIndicator?: React.ReactNode;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  type?: "button" | "submit" | "reset";
} & VariantProps<typeof buttonVariants>;

type AsProp<C extends React.ElementType> = {
  component?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C, ButtonBaseProps>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type ButtonComponent = (<C extends React.ElementType = "button">(
  props: ButtonProps<C> & { ref?: PolymorphicRef<C> },
) => React.ReactElement | null) & {
  displayName: string;
};
