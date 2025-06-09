import type { ReactNode, CSSProperties, ChangeEvent } from "react";

export interface RadioChangeEvent
  extends Omit<ChangeEvent<HTMLInputElement>, "target"> {
  target: ChangeEvent<HTMLInputElement>["target"] & {
    value: Primitive;
  };
}
export type Primitive = string | number | boolean;

export interface RadioChangeMetadata {
  id: string;
  value: Primitive;
  name: string;
  checked: boolean;
}

export interface RadioGroupProps {
  id?: string;
  children?: ReactNode;
  defaultValue?: Primitive;
  value?: Primitive;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value?: Primitive,
    meta?: RadioChangeMetadata,
  ) => void;
  onValueChange?: (value: Primitive, meta?: RadioChangeMetadata) => void;
  row?: boolean;
  sx?: CSSProperties;
  name?: string;
}
