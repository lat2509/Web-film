import axiosClient from "./axiosClient";

export type MediaType = "movie" | "tv";
export type TimeWindow = "day" | "week";

const DEFAULT_LANG = "en-US";

// 1. Trending (Xu hướng)
export const getTrending = (mediaType: MediaType | "all", timeWindow: TimeWindow) => {
  return axiosClient.get(`/trending/${mediaType}/${timeWindow}`);
};

// 2. Get List (Danh sách phim theo danh mục)
export const getMediaList = (type: MediaType, category: string, page = 1) => {
  return axiosClient.get(`/${type}/${category}`, {
    params: {
      page,
      language: DEFAULT_LANG,
    },
  });
};

// 3. Discover
export const discoverMedia = (
  type: MediaType,
  params: Record<string, string | number | boolean | string[] | undefined>,
) => {
  return axiosClient.get(`/discover/${type}`, {
    params: {
      language: DEFAULT_LANG,
      ...params,
    },
  });
};

// 4. Details & Videos
export const getVideos = (type: MediaType, id: number) => {
  return axiosClient.get(`/${type}/${id}/videos`, {
    params: { language: DEFAULT_LANG },
  });
};

// 5. Search
export const searchMulti = (query: string, page = 1) => {
  return axiosClient.get("/search/multi", {
    params: {
      query,
      page,
      language: DEFAULT_LANG,
    },
  });
};

export const searchByType = (type: string, query: string, page: number = 1) => {
  return axiosClient.get(`/search/${type}`, {
    params: {
      query,
      page,
      language: DEFAULT_LANG,
      include_adult: false,
    },
  });
};

// API lấy chi tiết phim
export const getDetails = (type: MediaType, id: number) => {
  return axiosClient.get(`/${type}/${id}`, {
    params: { language: DEFAULT_LANG },
  });
};

// API lấy danh sách quốc gia
export const getCountries = () => {
  return axiosClient.get("/configuration/countries");
};
