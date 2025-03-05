import React from "react";

/**
 * An override of the default HTML tag.
 * Can also be another React component.
 */
export type ComponentProp<C extends React.ElementType> = {
  component?: C;
};

/**
 * Polymorphic component prop type that works with React 19's new ref handling
 */
export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = ComponentProp<C> &
  Omit<React.ComponentProps<C>, keyof ComponentProp<C> | keyof Props> &
  Props;

/**
 * Component type with polymorphic 'component' prop supporting React 19 ref handling
 */
export type PolymorphicComponent<
  Props,
  DefaultElementType extends React.ElementType,
> = {
  <C extends React.ElementType = DefaultElementType>(
    props: PolymorphicComponentProp<C, Props>,
  ): React.ReactElement | null;
  displayName?: string;
};

// For compatibility during transition from React 18 to 19
export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object,
> = PolymorphicComponentProp<C, Props>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentProps<C>["ref"];
