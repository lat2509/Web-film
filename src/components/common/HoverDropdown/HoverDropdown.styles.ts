import { styled, Box, Button } from "@mui/material";

export const Wrapper = styled(Box)({
  display: "flex",
  height: "100%",
  alignItems: "center",
});

export const DropdownButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "none",
  minWidth: "auto",
  padding: theme.spacing(0.5, 1),
  "&:hover": {
    backgroundColor: "transparent",
    opacity: 0.8,
  },
}));
