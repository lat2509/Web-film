import { useState, useEffect, useMemo } from "react";
import type { MediaType } from "@app-types/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  popularList,
  trendingMovies,
  freeToWatch,
  airingTVshows,
  nowPlayingMovies,
} from "@api/moviesApi";

// Component con
import MediaSection from "@components/common/MediaSection";
import LatestTrailers from "@components/home/LatestTrailers";
import HeroBanner from "@components/home/HeroBanner";
import TrailerModal from "@components/common/TrailerModal";

// Constants
const PAGINATION = {
  TRENDING: 3,
  POPULAR: 4,
  AIRING_TV: 2,
  NOW_PLAYING: 2,
  FREE_TO_WATCH: 3,
} as const;

const LOADING_BOX_SX = { display: "flex", justifyContent: "center", p: 5 } as const;

type TrailerType = "popular" | "on_tv" | "in_theaters";

const Home = () => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  // --- STATES ---
  const [alignment, setAlignment] = useState<"day" | "week">("day");
  const [popularMediaType, setPopularMediaType] = useState<"movie" | "tv">("movie");
  const [freeToWatchType, setFreeToWatchType] = useState<"movie" | "tv">("movie");
  const [trailerType, setTrailerType] = useState<TrailerType>("popular");
  const [playingMovieId, setPlayingMovieId] = useState<number | null>(null);
  const [bannerMovie, setBannerMovie] = useState<MediaType | null>(null);

  // --- QUERIES ---
  const { data: freeMovie = [] } = useQuery({
    queryKey: ["freeMovie", freeToWatchType],
    queryFn: async () =>
      (await freeToWatch(freeToWatchType, "en-US", PAGINATION.FREE_TO_WATCH, "free")).data.results,
    placeholderData: keepPreviousData,
  });

  const { data: popularMedia = [] } = useQuery({
    queryKey: ["popularMedia", popularMediaType],
    queryFn: async () =>
      (await popularList(popularMediaType, "en-US", PAGINATION.POPULAR)).data.results,
    placeholderData: keepPreviousData,
  });

  const { data: trailerVideos = [] } = useQuery({
    queryKey: ["trailerVideos", trailerType],
    queryFn: async () => {
      switch (trailerType) {
        case "on_tv":
          return (await airingTVshows("en-US", PAGINATION.AIRING_TV)).data.results;
        case "in_theaters":
          return (await nowPlayingMovies("en-US", PAGINATION.NOW_PLAYING)).data.results;
        case "popular":
        default:
          return (await popularList("movie", "en-US", PAGINATION.TRENDING)).data.results;
      }
    },
    placeholderData: keepPreviousData,
  });

  const {
    data: movieTrending = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieTrending", alignment],
    queryFn: async () => (await trendingMovies(alignment)).data.results,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (movieTrending && movieTrending.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieTrending.length);
      setBannerMovie(movieTrending[randomIndex]);
    }
  }, [movieTrending]);

  // Memoized banner URL
  const bannerUrl = useMemo(
    () => (bannerMovie?.backdrop_path ? `${envImgUrl}${bannerMovie.backdrop_path}` : ""),
    [bannerMovie, envImgUrl],
  );

  // Helper function to get media type from trailer type
  const getTrailerMediaType = (): "movie" | "tv" => {
    return trailerType === "on_tv" ? "tv" : "movie";
  };

  if (isLoading)
    return (
      <Box sx={LOADING_BOX_SX}>
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Box sx={LOADING_BOX_SX}>
        <Typography color="error">Error loading data</Typography>
      </Box>
    );

  return (
    <>
      {/* 1. Hero Banner */}
      <HeroBanner bgImage={bannerUrl} />

      {/* 2. Trending */}
      <MediaSection
        title="Trending"
        items={[
          { label: "Today", value: "day" },
          { label: "This Week", value: "week" },
        ]}
        value={alignment}
        onToggle={setAlignment}
        data={movieTrending}
      />

      {/* 3. Latest Trailers */}
      <LatestTrailers
        data={trailerVideos}
        value={trailerType}
        onToggle={setTrailerType}
        onPlay={(id) => setPlayingMovieId(id)}
      />

      {/* 4. Popular */}
      <MediaSection
        title="What's Popular"
        items={[
          { label: "Movies", value: "movie" },
          { label: "On TV", value: "tv" },
        ]}
        value={popularMediaType}
        onToggle={setPopularMediaType}
        data={popularMedia}
      />

      {/* 5. Free To Watch */}
      <MediaSection
        title="Free To Watch"
        items={[
          { label: "Movies", value: "movie" },
          { label: "On TV", value: "tv" },
        ]}
        value={freeToWatchType}
        onToggle={setFreeToWatchType}
        data={freeMovie}
      />

      {/* 6. Modal */}
      {playingMovieId && (
        <TrailerModal
          id={playingMovieId}
          type={getTrailerMediaType()}
          onClose={() => setPlayingMovieId(null)}
        />
      )}
    </>
  );
};

export default Home;
