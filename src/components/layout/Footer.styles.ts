import { styled, Box, Typography, Link } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  maxWidth: "1400px",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  gap: theme.spacing(4),

  // Responsive
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const FooterLogo = styled("img")(({ theme }) => ({
  width: 130,
  height: "auto",
  display: "block",
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    margin: "0 auto 16px auto",
  },
}));

export const FooterColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "uppercase",
  marginBottom: theme.spacing(1),
  color: theme.palette.common.white,
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "1rem",
  textDecoration: "none",
  cursor: "pointer",
  lineHeight: 1.8,

  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.secondary.main,
  },
}));
