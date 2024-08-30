import { ComponentPropsWithoutRef } from "react";

export default function AppFrame({
  children,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="bg-background-darker">
      <div
        className="relative max-w-main-frame w-screen flex flex-col bg-background margin mx-auto min-h-screen  border-background box-border"
        id="appFrame"
      >
        {children}
      </div>
    </div>
  );
}
