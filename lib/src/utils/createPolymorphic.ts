import React from "react";
import type {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from "@/types/polymorphic";

export function createPolymorphic<
  DefaultElement extends React.ElementType,
  Props extends object = object,
>(
  defaultElement: DefaultElement,
  displayName: string,
  render: (
    props: PolymorphicComponentProps<DefaultElement, Props>,
  ) => React.ReactElement,
) {
  const Component = React.forwardRef<
    React.ComponentRef<DefaultElement>,
    PolymorphicComponentProps<DefaultElement, Props>
  >(function Component({ component, ...props }, ref) {
    const Element = component || defaultElement;
    const rendered = render({ ...props, ref } as PolymorphicComponentProps<
      DefaultElement,
      Props
    >);

    return React.createElement(Element, {
      ...props,
      ref,
      className: (rendered.props as { className?: string }).className,
      children: (rendered.props as { children?: React.ReactNode }).children,
    });
  }) as unknown as PolymorphicComponent<DefaultElement, Props>;

  Component.displayName = displayName;
  return Component;
}
