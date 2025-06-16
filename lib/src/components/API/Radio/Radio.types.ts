import {
  CSSProperties,
  ElementType,
  InputHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  ChangeEvent,
  Ref,
} from "react";
import { VariantProps } from "class-variance-authority";
import { radioVariants, RadioColor, RadioSize } from "./variants";

export type Primitive = string | number | boolean | undefined;

export type RadioSlots = {
  root?: ElementType;
  input?: ElementType;
};

export type RadioSlotProps = {
  root?: HTMLAttributes<HTMLElement> & {
    ref?: Ref<HTMLElement>;
    name?: string;
  };
  input?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
    name?: string;
  };
};

export type RadioBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "value"
> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: Primitive;
  color?: RadioColor;
  size?: RadioSize;
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  slots?: RadioSlots;
  slotProps?: RadioSlotProps;
  sx?: CSSProperties;
} & VariantProps<typeof radioVariants>;
