import type { Option } from "@components/common/AvailabilitiesFilter";

// Catalog Constants
export const AVAILABILITIES_OPTIONS = ["Stream", "Free", "Ads", "Rent", "Buy", "Coming Soon"];
export const RELEASE_DATE_OPTIONS = [
  "Theatrical (limited)",
  "Theatrical",
  "Premiere",
  "Digital",
  "Physical",
  "TV",
];
export const SORT_OPTIONS = [
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Release Date Descending", value: "primary_release_date.desc" },
  { label: "Release Date Ascending", value: "primary_release_date.asc" },
  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },
];

export const DEFAULT_SORT = "popularity.desc";

export const ENDPOINT_MAP: Record<string, string> = {
  popular: "popular",
  "top-rated": "top_rated",
  upcoming: "upcoming",
  "now-playing": "now_playing",
  "airing-today": "airing_today",
  "on-the-air": "on_the_air",
};

export const AVAILABILITIES_OPTIONS_1: Option[] = [
  { label: "Stream", value: "flatrate" },
  { label: "Free", value: "free" },
  { label: "Ads", value: "ads" },
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
];
export const RELEASE_DATE_OPTIONS_1: Option[] = [
  { label: "Theatrical (limited)", value: "2" },
  { label: "Theatrical", value: "3" },
  { label: "Premiere", value: "1" },
  { label: "Digital", value: "4" },
  { label: "Physical", value: "5" },
  { label: "TV", value: "6" },
];

// Constants
export const HOME_PATH = "/";
export const AVATAR_INITIAL = "A";
export const SEARCH_ICON_SIZE = 24;
export const LOGIN_TEXT = "đăng nhập";

export const MENU_PROPS = {
  anchorOrigin: { vertical: "bottom" as const, horizontal: "center" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "center" as const },
};

// Data Menu (Có thể tách ra file constants riêng nếu muốn)
export const MOVIE_MENU_ITEMS = [
  { label: "Popular", path: "/browse/movie/popular" },
  { label: "Now Playing", path: "/browse/movie/now-playing" },
  { label: "Upcoming", path: "/browse/movie/upcoming" },
  { label: "Top Rated", path: "/browse/movie/top-rated" },
];

export const TV_MENU_ITEMS = [
  { label: "Popular", path: "/browse/tv/popular" },
  { label: "Airing Today", path: "/browse/tv/airing-today" },
  { label: "On TV", path: "/browse/tv/on-the-air" },
  { label: "Top Rated", path: "/browse/tv/top-rated" },
];

export const SEARCH_RESULTS_OPTION = [
  { label: "Movies", value: "movie" },
  { label: "TV shows", value: "tv" },
  { label: "People", value: "person" },
  { label: "Companies", value: "company" },
  { label: "Keywords", value: "keyword" },
  { label: "Colections", value: "collection" },
];
