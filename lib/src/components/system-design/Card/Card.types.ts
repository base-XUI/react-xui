import { ElementType, ComponentPropsWithoutRef } from "react";

export type PolymorphicComponentsProp<E extends ElementType> = {
  component?: E;
};

export type PolymorphicProps<E extends ElementType> =
  PolymorphicComponentsProp<E> & ComponentPropsWithoutRef<E>;

// The full polymorphic component props
export type CardProps<E extends ElementType = "div"> = PolymorphicProps<E>;
export type CardHeaderProps<E extends ElementType = "div"> =
  PolymorphicProps<E>;
export type CardTitleProps<E extends ElementType = "h3"> = PolymorphicProps<E>;
export type CardActionProps<E extends ElementType = "div"> =
  PolymorphicProps<E>;
export type CardContentProps<E extends ElementType = "div"> =
  PolymorphicProps<E>;
export type CardFooterProps<E extends ElementType = "div"> =
  PolymorphicProps<E>;

// export type CardSize = "xs" | "sm" | "md" | "lg" | "xl";

export type CardSlot =
  | "card"
  | "card-header"
  | "card-title"
  | "card-action"
  | "card-content"
  | "card-footer";
