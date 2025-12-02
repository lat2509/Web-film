import { styled, Box, FormControlLabel } from "@mui/material";

export const FilterContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ParentLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
}));

export const ChildGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isHidden",
})<{ isHidden: boolean }>(({ theme, isHidden }) => ({
  display: isHidden ? "none" : "flex",
  flexDirection: "column",
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(1),
}));
