import Icon from "@/components/Icon";
import { Close } from "@/assets/buttons/export";
import { OverlayClose } from "@/components/global/type";

export interface OverlayStandardLayoutProps
  extends React.ComponentPropsWithoutRef<"div"> {
  close: OverlayClose;
  title?: string;
}

export function OverlayStandardLayout({
  title,
  close,
  children,
}: OverlayStandardLayoutProps) {
  return (
    <>
      <div className="bg-background px-1 box-border rounded-xl shadow-md">
        <header className="w-full relative flex justify-center items-center after:content-[''] after:block after:h-0 after:absolute after:bottom-0 after:w-11/12 after:border-black after:border-[0.5px] after:opacity-10 ">
          <h3 className="text-center h-9 text-lg">{title}</h3>
          <Icon
            tag="button"
            className="block w-6  absolute right-4"
            onClick={close}
            src={Close}
          />
        </header>
        <div className="flex flex-col justify-between w-full mx-auto gap-3 py-4 max-h-[600px] overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
}
