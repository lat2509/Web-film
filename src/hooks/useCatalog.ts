import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMedia, getMediaList } from "@api/moviesApi";
import { DEFAULT_SORT, ENDPOINT_MAP } from "@utils/constant";

interface UseCatalogProps {
  type: "movie" | "tv";
  category: string;
  filters?: Record<string, any>;
}

export const useCatalog = ({ type, category, filters = {} }: UseCatalogProps) => {
  const apiEndpoint = ENDPOINT_MAP[category] || category;
  const isFiltering =
    (Object.keys(filters).length > 0 && filters.sort_by !== DEFAULT_SORT) ||
    filters.watch_region !== "US" ||
    (filters.availabilities && filters.availabilities.length > 0) ||
    (filters.release_types && filters.release_types.length > 0);

  const query = useInfiniteQuery({
    queryKey: ["catalog", type, apiEndpoint, filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      if (isFiltering) {
        const res = await discoverMedia(type, {
          ...filters,
          watch_region: filters.watch_region || "US",
          with_watch_monetization_types: filters.availabilities?.join("|"),
          with_release_type: filters.release_types?.join("|"),
          page: pageParam,
        });
        return res.data;
      } else {
        const res = await getMediaList(type, apiEndpoint, pageParam);
        return res.data;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const flatData = query.data?.pages.flatMap((page) => page.results) || [];

  return {
    ...query,
    flatData,
  };
};
