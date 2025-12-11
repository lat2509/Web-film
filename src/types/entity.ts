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
