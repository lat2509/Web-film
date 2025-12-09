import { Menu } from "@mui/material";
import type { ReactNode } from "react";

// Hooks & Styles
import { useMenu } from "@hooks/useMenu";
import { Wrapper, DropdownButton } from "@styles/HoverDropdown.styles";

export interface HoverDropdownType {
  label: string;
  children: ReactNode;
}

const HoverDropdown = ({ label, children }: HoverDropdownType) => {
  const { anchorEl, open, handleOpen, handleClose } = useMenu();

  return (
    <Wrapper>
      <DropdownButton
        aria-owns={open ? "mouse-over-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {label}
      </DropdownButton>

      <Menu
        id="mouse-over-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
          sx: { py: 0.5 },
        }}
        disableRestoreFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {children}
      </Menu>
    </Wrapper>
  );
};

export default HoverDropdown;
