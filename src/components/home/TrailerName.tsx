import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import { trailerVideo } from "@api/moviesApi";
import type { VidType } from "@app-types/type";

const TrailerName = ({ id, type }: { id: number; type: "movie" | "tv" }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["videoTrailer", id, type],
    queryFn: async () => {
      const res = await trailerVideo(type, id, "en-US");
      const results = res.data.results;
      const trailer = results.find(
        (vid: VidType) => vid.type === "Trailer" && vid.site === "YouTube",
      );
      return trailer || results[0] || null;
    },
    staleTime: 1000 * 60 * 60,
  });

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
