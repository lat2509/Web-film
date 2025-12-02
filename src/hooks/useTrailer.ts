import { useQuery } from "@tanstack/react-query";
import { trailerVideo } from "@api/moviesApi";
import type { VidType } from "@app-types/type";

interface UseTrailerProps {
  id: number;
  type: "movie" | "tv";
}

export const useTrailer = ({ id, type }: UseTrailerProps) => {
  const query = useQuery({
    queryKey: ["videoTrailer", id, type],
    queryFn: async () => {
      const res = await trailerVideo(type, id, "en-US");
      const results = res.data.results;
      const trailer = results.find(
        (vid: VidType) => vid.type === "Trailer" && vid.site === "YouTube",
      );
      return trailer || results[0] || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
