import { styled, Box, Typography } from "@mui/material";

export const SectionContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasBackground",
})<{ hasBackground?: boolean }>(({ theme, hasBackground }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  paddingTop: theme.spacing(4),
  backgroundImage: hasBackground ? "url(/images/trending-bg.svg)" : "none",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1400px",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),

  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const HorizontalScroll = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  paddingBottom: theme.spacing(2.5),
  "&::-webkit-scrollbar": { height: 8 },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 4,
    backgroundColor: theme.palette.grey[300],
  },
}));
