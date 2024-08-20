import { ComponentPropsWithoutRef } from "react";

export function MainCustomButton({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={`bg-main px-4 py-2 w-fit rounded-lg mx-auto shadow-lg text-white box-border block ${props.className} cursor-pointer flex items-center justify-center`}
    >
      {children}
    </button>
  );
}
