import { ElementType } from "react";

import { cn } from "@/utils/cn";
import { CardHeaderProps } from "./Card.types";

export function CardHeader<E extends ElementType = "div">(props: CardHeaderProps<E>) {
  const {
    className,
    title,
    subheader,
    avatar,
    action,
    titleProps,
    subheaderProps,
    avatarProps,
    actionProps,
    children,
    component: Component = "div",
    ...rest
  } = props;
  if (children && !title && !subheader && !avatar && !action) {
    return (
      <Component
        data-slot="card-header"
        className={cn(
          "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  const hasAction = action !== undefined;
  const hasAvatar = avatar !== undefined;
  const TitleComponent = titleProps?.component || "h3";
  const SubheaderComponent = subheaderProps?.component || "p";

  return (
    <Component
      data-slot="card-header"
      className={cn("flex items-start gap-4 px-6 [.border-b]:pb-6", className)}
      {...props}
    >
      {hasAvatar && (
        <div
          data-slot="card-avatar"
          className={cn("flex-shrink-0", avatarProps?.className)}
        >
          {avatar}
        </div>
      )}

      <div className="min-w-0 flex-1">
        {title && (
          <TitleComponent
            data-slot="card-title"
            className={cn(
              "text-card-foreground leading-none font-semibold",
              titleProps?.className,
            )}
          >
            {title}
          </TitleComponent>
        )}
        {subheader && (
          <SubheaderComponent
            data-slot="card-subheader"
            className={cn(
              "text-muted-foreground mt-1 text-sm",
              subheaderProps?.className,
            )}
          >
            {subheader}
          </SubheaderComponent>
        )}
      </div>

      {hasAction && (
        <div
          data-slot="card-action"
          className={cn("flex-shrink-0", actionProps?.className)}
        >
          {action}
        </div>
      )}
      {children}
    </Component>
  );
}
