import { Box, CircularProgress, type BoxProps } from "@mui/material";

interface LoadingProps extends BoxProps {
  height?: string | number;
  size?: number;
}

const Loading = ({ height = "50vh", size = 40, ...props }: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
      width="100%"
      {...props}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loading;
