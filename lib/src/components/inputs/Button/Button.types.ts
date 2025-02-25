import React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";
import { PolymorphicProps } from "@/utils/PolymorphicComponent";

// export interface UseButtonParameters {
//   /**
//    * If `true`, the component is disabled.
//    * @default false
//    */
//   disabled?: boolean;
//   /**
//    * If `true`, allows a disabled button to receive focus.
//    * @default false
//    */
//   focusableWhenDisabled?: boolean;
//   href?: string;
//   onFocusVisible?: React.FocusEventHandler;
//   rootRef?: React.Ref<Element>;
//   tabIndex?: NonNullable<React.HTMLAttributes<any>["tabIndex"]>;
//   to?: string;
//   /**
//    * Type attribute applied when the `component` is `button`.
//    * @default 'button'
//    */
//   type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
//   /**
//    * The HTML element, e.g.'button', 'a' etc
//    * @default ''
//    */
//   rootElementName?: keyof HTMLElementTagNameMap;
// }

export interface ButtonTypeMap<
  AdditionalProps = object,
  RootComponentType extends React.ElementType = "button",
> {
  props: ButtonOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type ButtonOwnProps<
  RootComponentType extends React.ElementType = "button",
> = {
  loading?: boolean;
  loadingPosition?: "start" | "center" | "end";
  loadingIndicator?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  rootElementName?: keyof HTMLElementTagNameMap;
  component?: RootComponentType;
} & VariantProps<typeof buttonVariants>;

export type ButtonProps<
  RootComponentType extends
    React.ElementType = ButtonTypeMap["defaultComponent"],
> = PolymorphicProps<
  ButtonTypeMap<object, RootComponentType>,
  RootComponentType
>;
