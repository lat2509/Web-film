import { styled, Box, Typography, Button, InputBase } from "@mui/material";

// 1. Container chính
export const HeroContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImage",
})<{ bgImage: string }>(({ theme, bgImage }) => ({
  height: 360,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `${theme.gradients.heroOverlay}, url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "top center",
  backgroundRepeat: "no-repeat",
}));

// 2. Wrapper nội dung
export const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1400px",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: "center",
  },
}));

// 3. Typography
export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  color: theme.palette.common.white,
  lineHeight: 1,
  marginBottom: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.common.white,

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

// 4. Search Area
export const SearchForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
  position: "relative",
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  height: 46,
  borderRadius: "30px",
  backgroundColor: theme.palette.common.white,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(15),
  fontSize: "1rem",
  color: theme.palette.text.secondary,

  "& input::placeholder": {
    fontStyle: "italic",
  },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  height: 46,
  borderRadius: "30px",
  padding: theme.spacing(0, 4),

  background: theme.gradients.searchButton,

  color: theme.palette.common.white,
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "none",

  "&:hover": {
    color: theme.palette.common.black,
  },
}));
