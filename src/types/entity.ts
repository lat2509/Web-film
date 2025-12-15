// Dùng chung cho Movie List, Search Result
export interface MovieType {
  id: number;
  title: string;
  name?: string; // Dùng cho TV Show
  poster_path: string;
  release_date: string;
  first_air_date?: string; // Dùng cho TV Show
  vote_average: number;
  // Có thể thêm media_type nếu cần phân biệt
  media_type?: "movie" | "tv" | "person";
}

// Dùng cho backdrop, trailer section
export interface MediaType {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string;
}
export interface KnownForWork {
  id: number;
  title: string;
  name: string;
  media_type: string;
}
// Dùng cho kết quả search (Gộp cả person, movie, tv)
export interface SearchResultsFilm {
  id: number;
  name: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  profile_path: string; // Riêng cho Person
  known_for_department: string; // Riêng cho Person
  release_date: string;
  first_air_date: string;
  known_for: KnownForWork[];
}

// Dùng cho Video/Trailer
export interface VidType {
  id: number;
  site: string;
  type: string;
  name: string;
  key?: string;
  size?: number;
}

// Dùng cho Movie/Tv details
// --- 1. Các Sub-Interfaces dùng chung ---
export interface Genre {
  id: number;
  name: string;
}
export interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}
export interface Crew {
  id: number;
  name: string;
  job: string;
}
export interface Video {
  key: string;
  site: string;
  type: string;
}
export interface Image {
  file_path: string;
}

// --- 2. BASE INTERFACE (Chứa điểm chung) ---
interface BaseDetail {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  status: string;
  tagline: string;
  genres: Genre[];
  original_language: string;
  homepage: string;

  // Dữ liệu append_to_response chung
  credits: { cast: Cast[]; crew: Crew[] };
  videos: { results: Video[] };
  images: { backdrops: Image[]; posters: Image[]; logos: Image[] };
  recommendations: { results: any[] };
}

// --- 3. MOVIE DETAIL INTERFACE ---
export interface MovieDetail extends BaseDetail {
  // Trường đặc thù của Movie
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;

  // Cấu trúc keywords của Movie khác TV
  keywords: {
    keywords: { id: number; name: string }[];
  };
}

// --- 4. TV DETAIL INTERFACE ---
export interface TVDetail extends BaseDetail {
  // Trường đặc thù của TV
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];

  created_by: { id: number; name: string; profile_path: string | null }[];
  networks: { id: number; name: string; logo_path: string }[];
  seasons: {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string | null;
  }[];

  // Cấu trúc keywords của TV là 'results'
  keywords: {
    results: { id: number; name: string }[];
  };
}
