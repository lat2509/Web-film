import { Typography } from "@mui/material";
import { useTrailer } from "@hooks/useTrailer"; // Import Hook vừa tạo

const TrailerName = ({ id, type }: { id: number; type: "movie" | "tv" }) => {
  const { data, isLoading } = useTrailer({ id, type });

  if (isLoading) {
    return <Typography component="span">Loading...</Typography>;
  }

  return (
    <Typography component="span" variant="inherit">
      {data?.name || "Official Trailer"}
    </Typography>
  );
};

export default TrailerName;
