import { styled, Typography, Box, IconButton } from "@mui/material";

interface HeroContainerProp {
  bgImg: string;
}

// 1. Wrapper chính: Chỉnh lại Gradient sang màu tối (Dark Blue/Grey) chuẩn TMDB
export const HeroDetailsWrapper = styled(Box)<HeroContainerProp>(({ theme, bgImg }) => ({
  width: "100%",
  minHeight: "580px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundImage: `
    linear-gradient(to right, 
      rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), 
      rgba(31.5, 10.5, 10.5, 0.84) 50%, 
      rgba(31.5, 10.5, 10.5, 0.84) 100%
    ),
    url(${bgImg})
  `,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  color: theme.palette.common.white,
  marginTop: "46px",
}));

export const HeroDetailsContainer = styled(Box)(() => ({
  maxWidth: "1300px",
  width: "100%",
  height: "100%",
  padding: "30px 40px",
  display: "flex",
  alignItems: "center",
  gap: "40px",
  flexWrap: "wrap",
  "@media (max-width: 900px)": {
    justifyContent: "center",
  },
}));

// 2. Poster
export const PosterWrapper = styled(Box)(() => ({
  width: "300px",
  height: "450px",
  flexShrink: 0,
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
}));

export const PosterImg = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

// 3. Content bên phải
export const DetailsContentWrapper = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#fff",
}));

// --- TITLE SECTION ---
export const DetailsContentTitle = styled(Box)(() => ({
  width: "100%",
  marginBottom: "24px",
}));

export const TitleText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "2.2rem",
  lineHeight: 1.1,
  "& span": {
    fontWeight: 400,
    fontSize: "0.8em",
    opacity: 0.8,
    marginLeft: "8px",
  },
}));

export const SubTitleText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  fontSize: "1rem",
  "& .dot": {
    display: "inline-block",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
}));

// --- RATING & ACTIONS SECTION ---
export const DetailsActionsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: "wrap",
}));

export const ScoreCircleWrapper = styled(Box)(() => ({
  position: "relative",
  display: "inline-flex",
  backgroundColor: "#081c22",
  borderRadius: "50%",
  padding: "4px",
  "& .MuiCircularProgress-root": {
    borderRadius: "50%",
  },
}));

export const ActionButton = styled(IconButton)(() => ({
  backgroundColor: "rgba(3, 37, 65, 1)",
  color: "#fff",
  width: "46px",
  height: "46px",
  "&:hover": {
    backgroundColor: "rgba(3, 37, 65, 0.8)",
  },
}));

// --- OVERVIEW SECTION ---
export const TaglineText = styled(Typography)(() => ({
  fontStyle: "italic",
  opacity: 0.7,
  marginBottom: "10px",
  fontSize: "1.1rem",
}));

export const DetailsContentOverview = styled(Box)(() => ({
  width: "100%",
  marginBottom: "20px",
}));

// --- CREW GRID ---
export const CrewGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px",
}));

export const CrewItem = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const CrewName = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "1rem",
}));

export const CrewJob = styled(Typography)(() => ({
  fontSize: "0.9rem",
  opacity: 0.9,
}));

// --- BODY SECTION (Phần thân trang) ---
export const MainContentContainer = styled(Box)(() => ({
  maxWidth: "1300px",
  width: "100%",
  margin: "0 auto",
  padding: "30px 40px",
  display: "flex",
  gap: "30px",
  "@media (max-width: 900px)": {
    flexDirection: "column",
    padding: "20px",
  },
}));

// Cột bên trái (Cast, Review...)
export const LeftColumn = styled(Box)(() => ({
  flex: "1",
  overflow: "hidden",
}));

// Cột bên phải (Thông tin phụ: Status, Budget...)
export const RightColumn = styled(Box)(() => ({
  width: "260px",
  flexShrink: 0,
  "@media (max-width: 900px)": {
    width: "100%",
  },
}));

// --- CAST SECTION ---
export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1.4rem",
  marginBottom: "20px",
  color: "#000",
}));

export const CastScroller = styled(Box)(() => ({
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  paddingBottom: "10px",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#dbdbdb",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#a8a8a8",
  },
}));

export const CastCard = styled(Box)(() => ({
  minWidth: "138px",
  width: "138px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #e3e3e3",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
}));

export const CastImg = styled("img")(() => ({
  width: "100%",
  height: "175px",
  objectFit: "cover",
}));

export const CastInfo = styled(Box)(() => ({
  padding: "10px",
}));

export const ActorName = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "1rem",
  lineHeight: 1.2,
}));

export const CharacterName = styled(Typography)(() => ({
  fontSize: "0.9rem",
  lineHeight: 1.2,
  marginTop: "4px",
  color: "#666",
}));
