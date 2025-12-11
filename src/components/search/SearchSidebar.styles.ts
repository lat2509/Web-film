import { styled } from "@mui/material/styles";
import { Box, Typography, ListItemButton } from "@mui/material";

// Container chính bên ngoài
export const SidebarContainer = styled(Box)(({ theme }) => ({
  minWidth: "260px",
  height: "fit-content",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

// Phần Header màu xanh
export const SidebarHeader = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: "center",
  fontWeight: 600,
}));

// Styled cho từng dòng item
export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export const CountBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(0, 1),
  borderRadius: "10px",
  fontSize: "0.8rem",
  minWidth: "30px",
  textAlign: "center",
  backgroundColor: active ? theme.palette.common.white : theme.palette.grey[200],
  border: active ? `1px solid ${theme.palette.grey[300]}` : "none",
  transition: "all 0.2s ease",
}));
