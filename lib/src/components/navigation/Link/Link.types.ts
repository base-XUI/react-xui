import React from "react";
import type { VariantProps } from "class-variance-authority";
import { LinkVariants } from "./variants";

import type {
  PolymorphicComponentProp,
  PolymorphicComponent,
} from "@/utils/polymorphic";

/**
 * Base props for the Link component
 */
export type LinkBaseProps = {  

  className?: string;
  children: React.ReactNode;
  variant?: VariantProps<typeof LinkVariants>["variant"];
  color?: VariantProps<typeof LinkVariants>["color"];
  underline?: VariantProps<typeof LinkVariants>["underline"];
  target?: VariantProps<typeof LinkVariants>["target"];
  rel?: VariantProps<typeof LinkVariants>["rel"];
 
} & VariantProps<typeof LinkVariants>;

/**
 * Props for the Link component including the ref
 * Compatible with React 19's new ref handling
 */
export type LinkProps<C extends React.ElementType = "a"> =
  PolymorphicComponentProp<C, LinkBaseProps>;

/**
 * Link component type
 */
export type LinkComponent = PolymorphicComponent<LinkBaseProps, "a">;
