// components/SearchResultItem.styles.ts
import { styled } from "@mui/material/styles";
import { Paper, Box, Typography } from "@mui/material";

// Card cho Company/Keyword
export const SimpleCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "5px",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

// Card cho Movie/TV/Person
export const DetailedCard = styled(Paper)(({ theme }) => ({
  height: "141px",
  display: "flex",
  marginBottom: "20px",
  borderRadius: "5px",
  overflow: "hidden",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

// Wrapper cho ảnh để cố định size
export const ImageWrapper = styled(Box)(() => ({
  minWidth: "94px",
  width: "94px",
  flexShrink: 0,
}));

// Styled cho thẻ img
export const PosterImage = styled("img")({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

// Wrapper cho phần nội dung text bên phải
export const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  flex: 1,
  overflow: "hidden",
}));

// Title phim
export const TitleText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1.1rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

// Styled riêng cho đoạn mô tả để cắt dòng (Line Clamp)
export const DescriptionText = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
}));
