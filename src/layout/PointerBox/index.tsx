export function PointerBox({
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div>
      <div
        className={`relative border-b-background-darker border-b-[10px] mx-auto pointer-box-triangle`}
      ></div>
      <div
        className={`bg-background-darker flex justify-center items-center w-fit px-10 pointer-box-frame`}
      >
        {children}
      </div>
    </div>
  );
}
