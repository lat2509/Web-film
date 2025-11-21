import { useQuery } from "@tanstack/react-query";
import { trailerVideo } from "../../api/moviesApi";
import type { VidType } from "../../types/type";

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
    staleTime: 1000 * 60 * 60, // Cache 1 tiếng
  });

  if (isLoading) return <span>Loading...</span>;
  return <span>{data?.name || "Official Trailer"}</span>;
};

export default TrailerName;
