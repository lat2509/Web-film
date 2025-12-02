import { Menu } from "@mui/material";
import type { HoverDropdownType } from "@app-types/type";

// Hooks & Styles
import { useMenu } from "@hooks/useMenu";
import { Wrapper, DropdownButton } from "@styles/HoverDropDown.styles";

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
