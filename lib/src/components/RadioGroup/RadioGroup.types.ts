import type {
  ReactNode,
  CSSProperties,
  ChangeEvent,
  ReactElement,
} from "react";

export interface RadioChangeEvent
  extends Omit<ChangeEvent<HTMLInputElement>, "target"> {
  target: ChangeEvent<HTMLInputElement>["target"] & {
    value: Primitive;
  };
}
export type Primitive = string | number | boolean | undefined;

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
export interface RadioProps extends RadioGroupProps {
  control?: ReactElement;
  checked?: boolean;
  [key: string]: unknown;
}

export const ELEMENT_TYPES = {
  FORM_CONTROL_LABEL: "formControlLabel",
  RADIO: "radio",
  OTHER: "other",
} as const;

export type ElementType = (typeof ELEMENT_TYPES)[keyof typeof ELEMENT_TYPES];
