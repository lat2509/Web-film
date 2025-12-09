import { searchMulti } from "@api/moviesApi";
import { useQuery } from "@tanstack/react-query";

export const useMoviesSearch = (query: string) => {
  const movieSearch = useQuery({
    queryKey: ["searchMulti", query],
    queryFn: async () => {
      const res = await searchMulti(query, 1);
      return res.data.results;
    },
    staleTime: 60 * 1000,
    enabled: !!query,
    placeholderData: (prev) => prev,
  });
  return movieSearch;
};
