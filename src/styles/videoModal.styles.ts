import { styled, Box, Typography, IconButton } from "@mui/material";

export const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Mặc định mobile
  maxWidth: "1000px",
  height: "auto",
  aspectRatio: "16/9",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.common.black,
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: theme.shadows[24],

  [theme.breakpoints.up("md")]: {
    width: "80%", // Tablet/Desktop
  },
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.common.black,
  padding: theme.spacing(1, 2),
  color: theme.palette.common.white,
}));

export const ModalTitle = styled(Typography)(() => ({
  fontSize: "1.25rem",
  fontWeight: 500,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    color: theme.palette.grey[400],
  },
}));

export const VideoWrapper = styled(Box)({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "relative",
});

export const Iframe = styled("iframe")({
  width: "100%",
  height: "100%",
  border: "none",
  position: "absolute",
  top: 0,
  left: 0,
});
