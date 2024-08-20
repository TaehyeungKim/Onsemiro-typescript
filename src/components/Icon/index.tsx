import React, { ComponentPropsWithoutRef } from "react";

type IconProps<T extends keyof JSX.IntrinsicElements> = {
  tag: T;
  src: string;
} & ComponentPropsWithoutRef<T>;

export default function Icon<T extends keyof JSX.IntrinsicElements>({
  tag,
  src,
  ...props
}: IconProps<T>) {
  const image = React.createElement("img", { src });
  const Icon = React.createElement(tag, props, [image]);

  return <>{Icon}</>;
}
