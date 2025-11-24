import type { HoverDropdownType } from "../../types/type";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const HoverDropdown = ({ label, children }: HoverDropdownType) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild className="hover:cursor-pointer">
        <button>{label}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.DropdownMenuContent
        sideOffset={6}
        align="start"
        className="z-20 flex w-36 flex-col outline-0 justify-center rounded-md bg-white font-normal text-black shadow-lg"
      >
        {children}
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.Root>
  );
};

export default HoverDropdown;
