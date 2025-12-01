import React, { useState, useCallback } from "react";
import { Menu, Box } from "@mui/material";
import type { HoverDropdownType } from "@app-types/type";
import { NavItemText } from "@styles/header.styles";

const HoverDropdown = ({ label, children }: HoverDropdownType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <NavItemText
        aria-owns={open ? "mouse-over-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {label}
      </NavItemText>

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
    </Box>
  );
};

export default HoverDropdown;
