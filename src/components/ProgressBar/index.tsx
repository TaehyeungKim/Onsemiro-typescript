import { useEffect, useRef } from "react";
import { ProgressBarProps } from "./type";

export default function ProgressBar({ total, cur }: ProgressBarProps) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bar.current?.setAttribute("style", `width: ${(cur * 100) / total}%`);
  }, [cur]);

  return (
    <div
      className={`flex flex-row flex-wrap box-border bg-background h-4 rounded-md shadow-inner overflow-hidden`}
    >
      <div
        ref={bar}
        className={`box-border bg-main rounded-md bar-shadow transition-width duration-700 ease-in-out`}
      ></div>
    </div>
  );
}
