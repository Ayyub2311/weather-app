import type { Dispatch, SetStateAction } from "react";
import Hamburger from "../assets/hamburger.svg?react";
import LightDarkToggle from "./LightDarkToggle";

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className="w-full h-16 p-4 bg-card/95 sticky top-0 xs:hidden gap-8 flex justify-end z-[1001] text-card-foreground border-b border-border shadow-sm backdrop-blur-md">
      <LightDarkToggle />
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className="size-6 ml-auto text-card-foreground" />
      </button>
    </div>
  );
}
