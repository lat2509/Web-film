export interface HoverDropdownType {
  label: string;
  children: ReactNode;
}

export interface MovieType {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
}

export interface MediaType {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string;
}

export interface MediaSectionProps {
  title: string;
  items: { label: string; value: string }[];
  value: string;
  onToggle: (val: any) => void;
  data: MovieType[];
}

export interface TrailerModalProp {
  id: number;
  type: "movie" | "tv";
  onClose: () => void;
}

export interface LatestTrailersProps {
  data: MediaType[];
  value: string;
  onToggle: (val: any) => void;
  onPlay: (id: number) => void;
}

export interface VidType {
  id: number;
  site: string;
  type: string;
  name: string;
  key?: string;
  size?: number;
}

export interface HeroBannerProps {
  bgImage: string;
}
