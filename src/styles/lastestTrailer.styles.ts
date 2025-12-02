import { styled, Box, Typography } from "@mui/material";

export const TrailerSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImage",
})<{ bgImage: string }>(({ theme, bgImage }) => ({
  position: "relative",
  width: "100%",
  minHeight: 300,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  backgroundImage: `${theme.gradients.trailerOverlay}, url(${bgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  transition: "background-image 0.5s ease-in-out",
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),

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
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.common.white,
}));

export const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  paddingBottom: theme.spacing(2.5),
  gap: theme.spacing(2.5),

  // Custom Scrollbar
  "&::-webkit-scrollbar": { height: 8 },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
}));

// --- TRAILER CARD ---

export const TrailerCard = styled(Box)(() => ({
  position: "relative",
  minWidth: 300,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",

  "&:hover .play-icon": {
    transform: "scale(1.5)",
  },
  "&:hover .trailer-img": {
    transform: "scale(1.05)",
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: (theme.shape.borderRadius as number) * 2,
  aspectRatio: "16/9",
  boxShadow: theme.shadows[4],
}));

export const TrailerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  display: "block",
});

export const PlayIconOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  "& .play-icon": {
    fontSize: "3rem",
    color: theme.palette.common.white,
    transition: "transform 0.3s ease",
  },
}));

export const MovieTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  color: theme.palette.common.white,
  marginTop: theme.spacing(1.5),
}));

export const MovieSubtitle = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  fontSize: "0.9rem",
  color: theme.palette.common.white,
  opacity: 0.8,
}));
