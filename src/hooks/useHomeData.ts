import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTrending, getMediaList, discoverMedia } from "@api/moviesApi";

// Hook lấy Trending
export const useTrending = (timeWindow: "day" | "week") => {
  return useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: async () => (await getTrending("movie", timeWindow)).data.results,
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Popular
export const usePopular = (type: "movie" | "tv") => {
  return useQuery({
    queryKey: ["popular", type],
    queryFn: async () => (await getMediaList(type, "popular", 4)).data.results,
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Trailer
export const useLatestTrailers = (type: "popular" | "on_tv" | "in_theaters") => {
  return useQuery({
    queryKey: ["trailers", type],
    queryFn: async () => {
      if (type === "on_tv") return (await getMediaList("tv", "airing_today")).data.results;
      if (type === "in_theaters") return (await getMediaList("movie", "now_playing")).data.results;
      return (await getMediaList("movie", "popular", 3)).data.results;
    },
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Free To Watch
export const useFreeToWatch = (type: "movie" | "tv") => {
  return useQuery({
    queryKey: ["free", type],
    queryFn: async () =>
      (
        await discoverMedia(type, {
          page: 3,
          with_watch_monetization_types: "free",
          watch_region: "US",
        })
      ).data.results,
    placeholderData: keepPreviousData,
  });
};
