import { styled, Box, Typography } from "@mui/material";

export const TextContent = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const CardContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginRight: theme.spacing(2.5),
  minHeight: 300,
  width: 150,
  minWidth: 150,
  flex: "none",
  display: "flex",
  flexDirection: "column",
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: (theme.shape.borderRadius as number) * 2,
  overflow: "hidden",
  height: 224,
}));

export const CardImage = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  cursor: "pointer",
  display: "block",
});

export const RatingCircle = styled(Box)<{ scorecolor: string }>(({ theme, scorecolor }) => ({
  position: "absolute",
  top: 200,
  left: 8,
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.common.black,
  border: `2px solid ${theme.palette.common.black}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "0.8rem",

  "&::after": {
    content: '""',
    position: "absolute",
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: "50%",
    border: `2px solid ${scorecolor}`,
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: 1.2,
  cursor: "pointer",
  color: theme.palette.text.primary,
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,

  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export const CardDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  marginTop: theme.spacing(0.5),
}));
