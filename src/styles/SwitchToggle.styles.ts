import { styled, alpha } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  height: "30px",
  backgroundColor: theme.palette.common.white,
  borderRadius: "30px",
  border: `1px solid ${theme.palette.primary.main}`,

  "& .MuiToggleButtonGroup-grouped": {
    margin: 0,
    border: 0,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "14px",
    padding: theme.spacing(0, 2),
    color: theme.palette.primary.main,
    borderRadius: "30px",

    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },

    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: "30px",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));
