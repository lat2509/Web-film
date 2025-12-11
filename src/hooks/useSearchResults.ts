import { searchByType } from "@api/moviesApi";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { SEARCH_RESULTS_OPTION } from "@utils/constants";

export const useSearchResults = (query: string, type: string, page: number) => {
  const totalResultsQueries = useQueries({
    queries: SEARCH_RESULTS_OPTION.map((item) => ({
      queryKey: ["totalResults", item.value, query],
      queryFn: async () => {
        return (await searchByType(item.value, query, 1)).data;
      },
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000,
      enabled: !!query,
    })),
  });

  const stats = SEARCH_RESULTS_OPTION.map((item, index) => ({
    id: item.value,
    label: item.label,
    count: totalResultsQueries[index].data?.total_results || 0,
    isLoading: totalResultsQueries[index].isLoading,
  }));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchResults", type, query, page],
    queryFn: async () => {
      return (await searchByType(type, query, page)).data;
    },
    placeholderData: keepPreviousData,
    enabled: !!query,
  });

  const totalPages = data?.total_pages || 0;

  return {
    searchResults: data?.results || [],
    stats,
    totalPages,
    isLoading,
    isError,
  };
};
