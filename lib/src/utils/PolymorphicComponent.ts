import * as React from "react";

interface OverridableTypeMap {
  props: object;
  defaultComponent: React.ElementType;
}

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type PolymorphicProps<
  M extends OverridableTypeMap,
  C extends React.ElementType,
> = M["props"] &
  DistributiveOmit<React.ComponentPropsWithRef<C>, keyof M["props"]>;

export type PolymorphicComponent<M extends OverridableTypeMap> = {
  <C extends React.ElementType = M["defaultComponent"]>(
    props: PolymorphicProps<M, C> & {
      component?: C;
    },
  ): React.JSX.Element;
  propTypes?: any;
  displayName?: string;
};
