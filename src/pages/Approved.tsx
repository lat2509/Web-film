import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

// Hooks
import { useProcessLogin } from "@hooks/useAuth";
import Loading from "@components/common/Loading";

const Approved = () => {
  const { processLogin } = useProcessLogin();
  const isCalled = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const requestToken = searchParams.get("request_token");

    if (requestToken && !isCalled.current) {
      isCalled.current = true;
      processLogin(requestToken);
    }
  }, [processLogin]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={2}
    >
      <Loading />
      <Typography variant="h6" color="text.secondary">
        Processing your login...
      </Typography>
    </Box>
  );
};

export default Approved;
