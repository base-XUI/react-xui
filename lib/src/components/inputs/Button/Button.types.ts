import React from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";
import { PolymorphicProps } from "@/utils/PolymorphicComponent";

// Define valid HTML elements that can be used as a button
export type ValidButtonElements =
  | "button"
  | "a"
  | "div"
  | "span"
  | "input"
  | "label"
  | "select"
  | "textarea"
  | "form";

export interface ButtonTypeMap<
  AdditionalProps = object,
  RootComponentType extends React.ElementType = ValidButtonElements,
> {
  props: ButtonOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type ButtonOwnProps<
  RootComponentType extends React.ElementType = ValidButtonElements,
> = {
  loading?: boolean;
  loadingPosition?: "start" | "center" | "end";
  loadingIndicator?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  component?: RootComponentType;
} & VariantProps<typeof buttonVariants>;

export type ButtonProps<
  RootComponentType extends
    React.ElementType = ButtonTypeMap["defaultComponent"],
> = PolymorphicProps<
  ButtonTypeMap<object, RootComponentType>,
  RootComponentType
>;
