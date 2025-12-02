import { styled, Box, Button, InputBase, IconButton } from "@mui/material";

// --- MAIN HEADER ---

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: 64,
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  zIndex: theme.zIndex.appBar,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1400px",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),

  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Logo
export const Logo = styled("img")(({ theme }) => ({
  height: 32,
  marginRight: theme.spacing(2),
  cursor: "pointer",
  display: "block",
}));

// Nav Menu
export const NavList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  listStyle: "none",
  margin: 0,
  padding: 0,
  gap: theme.spacing(2),
}));

export const NavItemText = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  fontWeight: 700,
  minWidth: "auto",
  padding: theme.spacing(0.5, 1),
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
}));

// User Avatar Badge
export const UserBadge = styled(Box)(({ theme }) => ({
  height: 32,
  width: 32,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.2)",
  backgroundColor: theme.palette.success.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: theme.palette.common.white,
  fontWeight: 700,
}));

// --- SEARCH BAR SECTION ---

interface SearchContainerProps {
  isSticky?: boolean;
}

export const SearchContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSticky",
})<SearchContainerProps>(({ theme, isSticky }) => ({
  width: "100%",
  height: 44,
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.appBar - 1,
  display: "flex",
  justifyContent: "center",
  position: isSticky ? "sticky" : "absolute",
  top: isSticky ? 0 : 64,
  left: 0,
}));

export const SearchContent = styled("form")(({ theme }) => ({
  height: "100%",
  width: "100%",
  maxWidth: "1400px",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1),
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));

export const ClearButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: 4,
}));
