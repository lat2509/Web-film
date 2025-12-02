import { useInfiniteQuery } from "@tanstack/react-query";
import { mediaList } from "@api/moviesApi";

interface UseCatalogProps {
  type: "movie" | "tv";
  category: string;
}

export const useCatalog = ({ type, category }: UseCatalogProps) => {
  const query = useInfiniteQuery({
    queryKey: ["catalog", type, category],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await mediaList(type, category, "en-US", pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const flatData = query.data?.pages.flatMap((page) => page.results) || [];

  return {
    ...query, // Trả về isLoading, fetchNextPage...
    flatData,
  };
};
