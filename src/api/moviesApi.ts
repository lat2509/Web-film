import axiosClient from "./axiosClient";

export const trendingMovies = (time_window: string) => {
  return axiosClient.get(`/trending/movie/${time_window}`);
};

export const nowPlayingMovies = (language: string, page: number) => {
  return axiosClient.get("/movie/now_playing", {
    params: {
      language: language,
      page: page,
    },
  });
};

export const airingTVshows = (language: string, page: number) => {
  return axiosClient.get("/tv/airing_today", {
    params: {
      language: language,
      page: page,
    },
  });
};

export const popularList = (media: string, language: string, page: number) => {
  return axiosClient.get(`/${media}/popular`, {
    params: {
      language: language,
      page: page,
    },
  });
};

export const freeToWatch = (media: string, language: string, page: number, watch_type: string) => {
  return axiosClient.get(`/discover/${media}`, {
    params: {
      language: language,
      page: page,
      watch_type: watch_type,
    },
  });
};

export const trailerVideo = (type: "movie" | "tv", id: number, language: string) => {
  return axiosClient.get(`${type}/${id}/videos`, {
    params: {
      language: language,
    },
  });
};

export const mediaList = (media: string, catalog: string, language: string, page: number) => {
  return axiosClient.get(`/${media}/${catalog}`, {
    params: {
      language: language,
      page: page,
    },
  });
};
