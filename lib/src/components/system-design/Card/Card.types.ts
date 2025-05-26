import * as React from "react";

// Base card component props
export interface CardProps extends React.ComponentProps<"div"> {
  variant?: CardVariant;
  size?: CardSize;
  disabled?: boolean;
  clickable?: boolean;
}

export type CardHeaderProps = React.ComponentProps<"div">;
export type CardTitleProps = React.ComponentProps<"div">;
export type CardDescriptionProps = React.ComponentProps<"div">
export type CardActionProps = React.ComponentProps<"div">
export type CardContentProps = React.ComponentProps<"div">
export type CardFooterProps = React.ComponentProps<"div">

export type CardVariant =
  | "default"
  | "outlined"
  | "elevated"
  | "ghost"
  | "bordered";

export type CardSize = "xs" | "sm" | "md" | "lg" | "xl";

export type CardOrientation = "vertical" | "horizontal";

export type CardSlot =
  | "card"
  | "card-header"
  | "card-title"
  | "card-description"
  | "card-action"
  | "card-content"
  | "card-footer";
