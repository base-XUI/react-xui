import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

export type PolymorphicComponentsProp<E extends ElementType> = {
  component?: E;
};

export type PolymorphicProps<E extends ElementType> =
  PolymorphicComponentsProp<E> & ComponentPropsWithoutRef<E>;

export type CardProps<E extends ElementType> = PolymorphicProps<E> & {
  variant?: CardVariant;
  square?: boolean;
};
export type CardHeaderProps<E extends ElementType = "div"> =
  PolymorphicProps<E> & {
    title?: ReactNode;
    subheader?: ReactNode;
    avatar?: ReactNode;
    action?: ReactNode;

    titleProps?: {
      className?: string;
      component?: ElementType;
    };
    subheaderProps?: {
      className?: string;
      component?: ElementType;
    };
    avatarProps?: {
      className?: string;
    };
    actionProps?: {
      className?: string;
    };
  };

export type CardActionsProps<E extends ElementType> = PolymorphicProps<E> & {
  disableSpacing?: boolean;
  alignment?: "start" | "end" | "center" | "space-between";
  spacing?: "compact" | "normal" | "comfortable";
};

export type CardActionAreaProps<E extends ElementType> = PolymorphicProps<E> & {
  disabled?: boolean;
};
export type CardContentProps<E extends ElementType> = PolymorphicProps<E>;

export type CardMediaProps<E extends ElementType> = PolymorphicProps<E> & {
  src?: string;
  alt?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export type CardVariant = "filled" | "outlined";

export type CardSlot =
  | "card"
  | "card-header"
  | "card-media"
  | "card-actions"
  | "card-content"
  | "card-action-area";
