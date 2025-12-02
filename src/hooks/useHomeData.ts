import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  trendingMovies,
  popularList,
  freeToWatch,
  airingTVshows,
  nowPlayingMovies,
} from "@api/moviesApi";

// Hook lấy Trending
export const useTrending = (timeWindow: "day" | "week") => {
  return useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: async () => (await trendingMovies(timeWindow)).data.results,
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Popular
export const usePopular = (type: "movie" | "tv") => {
  return useQuery({
    queryKey: ["popular", type],
    queryFn: async () => (await popularList(type, "en-US", 4)).data.results,
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Trailer
export const useLatestTrailers = (type: "popular" | "on_tv" | "in_theaters") => {
  return useQuery({
    queryKey: ["trailers", type],
    queryFn: async () => {
      if (type === "on_tv") return (await airingTVshows("en-US", 2)).data.results;
      if (type === "in_theaters") return (await nowPlayingMovies("en-US", 2)).data.results;
      return (await popularList("movie", "en-US", 3)).data.results;
    },
    placeholderData: keepPreviousData,
  });
};

// Hook lấy Free To Watch
export const useFreeToWatch = (type: "movie" | "tv") => {
  return useQuery({
    queryKey: ["free", type],
    queryFn: async () => (await freeToWatch(type, "en-US", 3, "free")).data.results,
    placeholderData: keepPreviousData,
  });
};
