// src/layout/Home.tsx
import { useState, useEffect } from "react";
import type { MediaType } from "../types/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  popularList,
  trendingMovies,
  freeToWatch,
  airingTVshows,
  nowPlayingMovies,
} from "../api/moviesApi";

// Import các component con
import MediaSection from "../components/common/MediaSection";
import LatestTrailers from "../components/home/LastestTrailers";
import HeroBanner from "../components/home/HeroBanner";
import TrailerModal from "../components/common/TrailerModal";

const Home = () => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  // --- STATES ---
  const [alignment, setAlignment] = useState("day");
  const [popularTest, setPopular] = useState("movie");
  const [freeToWatchM, setFreeToWatch] = useState("movie");
  const [lastestTrailer, setLastestTrailer] = useState("popular");
  const [playingMovie, setPlayingMovie] = useState<{ id: number; type: "movie" | "tv" } | null>(
    null,
  );
  const [bannerMovie, setBannerMovie] = useState<MediaType | null>(null);
  // --- QUERIES ---
  const { data: freeMovie = [] } = useQuery({
    queryKey: ["freeMovie", freeToWatchM],
    queryFn: async () => (await freeToWatch(freeToWatchM, "en-US", 3, "free")).data.results,
    placeholderData: keepPreviousData,
  });

  const { data: popularMedia = [] } = useQuery({
    queryKey: ["popularMedia", popularTest],
    queryFn: async () => (await popularList(popularTest, "en-US", 4)).data.results,
    placeholderData: keepPreviousData,
  });

  const { data: trailerVideos = [] } = useQuery({
    queryKey: ["trailerVideos", lastestTrailer],
    queryFn: async () => {
      switch (lastestTrailer) {
        case "on_tv":
          return (await airingTVshows("en-US", 2)).data.results;
        case "in_theaters":
          return (await nowPlayingMovies("en-US", 2)).data.results;
        case "popular":
        default:
          return (await popularList("movie", "en-US", 3)).data.results;
      }
    },
    placeholderData: keepPreviousData,
  });

  const {
    data: movieTreding = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieTrending", alignment],
    queryFn: async () => (await trendingMovies(alignment)).data.results,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (movieTreding && movieTreding.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieTreding.length);
      setBannerMovie(movieTreding[randomIndex]);
    }
  }, [movieTreding]);
  if (isLoading) return <div className="flex items-center justify-center">Loading...!</div>;
  if (isError) return <div className="flex items-center justify-center">Error</div>;

  // Logic Banner
  const bannerUrl = bannerMovie?.backdrop_path ? `${envImgUrl}${bannerMovie.backdrop_path}` : "";

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
        data={movieTreding}
      />

      {/* 3. Latest Trailers */}
      <LatestTrailers
        data={trailerVideos}
        value={lastestTrailer}
        onToggle={setLastestTrailer}
        onPlay={(id) => setPlayingMovie({ id, type: lastestTrailer === "on_tv" ? "tv" : "movie" })}
      />

      {/* 4. Popular */}
      <MediaSection
        title="What's Popular"
        items={[
          { label: "Movies", value: "movie" },
          { label: "On TV", value: "tv" },
        ]}
        value={popularTest}
        onToggle={setPopular}
        data={popularMedia}
      />

      {/* 5. Free To Watch */}
      <MediaSection
        title="Free To Watch"
        items={[
          { label: "Movies", value: "movie" },
          { label: "On TV", value: "tv" },
        ]}
        value={freeToWatchM}
        onToggle={setFreeToWatch}
        data={freeMovie}
      />

      {/* 6. Modal */}
      {playingMovie && (
        <TrailerModal
          id={playingMovie.id}
          type={playingMovie.type}
          onClose={() => setPlayingMovie(null)}
        />
      )}
    </>
  );
};

export default Home;
