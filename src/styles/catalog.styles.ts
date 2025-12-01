import { styled, Box, Typography, Accordion, Button } from "@mui/material";

// --- LAYOUT CHUNG ---

export const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: "100vh",
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

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2.5),
  color: theme.palette.text.primary,
}));

export const LayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
  alignItems: "flex-start",

  // Mobile: Sidebar đẩy lên trên hoặc ẩn đi, Main full width
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

// --- SIDEBAR ---

export const Sidebar = styled(Box)(({ theme }) => ({
  minWidth: 260,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px !important",
  overflow: "hidden",
  marginBottom: theme.spacing(2),
  "&:before": { display: "none" },
}));

export const FilterTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1rem",
}));

// --- MAIN GRID ---

export const MainContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  width: "100%",
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(4),
  width: "100%",
}));

// --- MOVIE CARD ---

export const CardWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(3.5),
  height: 372,
  width: 184,
  display: "flex",
  flexDirection: "column",
  borderRadius: (theme.shape.borderRadius as number) * 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  transition: "transform 0.2s",
  backgroundColor: theme.palette.background.paper,

  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

export const CardImage = styled("img")({
  height: 272,
  width: "100%",
  objectFit: "cover",
  cursor: "pointer",
});

export const RatingCircle = styled(Box)<{ scoreColor: string }>(({ theme, scoreColor }) => ({
  position: "absolute",
  top: 252,
  left: 12,
  width: 38,
  height: 38,
  borderRadius: "50%",
  backgroundColor: theme.palette.common.black,
  border: `2px solid ${scoreColor}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "0.8rem",
}));

export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(1.5),
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  lineHeight: 1.2,
  cursor: "pointer",
  color: theme.palette.text.primary,

  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  height: 40,

  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export const CardDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  marginTop: theme.spacing(0.5),
}));

// --- BUTTONS ---

export const LoadMoreButton = styled(Button)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 0),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontSize: "1.2rem",
  fontWeight: 700,
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));
