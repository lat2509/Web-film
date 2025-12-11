import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTrending } from "@hooks/useHomeData";
import TrendingSection from "@components/movie/sections/TrendingSection";
import PopularSection from "@components/movie/sections/PopularSection";
import FreeToWatchSection from "@components/movie/sections/FreeToWatchSection";
import HeroBanner from "@components/home/HeroBanner";
import TrailerModal from "@components/common/TrailerModal/TrailerModal";
import LatestTrailersSection from "@components/movie/sections/LatestTrailerSection";

const Home = () => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  const { data: trendingMovies, isLoading, isError } = useTrending("day");
  const firstMovie = trendingMovies?.[0];
  const bannerUrl = firstMovie?.backdrop_path ? `${envImgUrl}${firstMovie.backdrop_path}` : "";
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [playingType, setPlayingType] = useState<"movie" | "tv">("movie");

  const handlePlayTrailer = (id: number, type: "movie" | "tv") => {
    setPlayingId(id);
    setPlayingType(type);
  };

  if (isLoading)
    return (
      <Box p={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Typography color="error" align="center" mt={5}>
        Error loading data
      </Typography>
    );

  return (
    <>
      <HeroBanner bgImage={bannerUrl} />

      <TrendingSection />

      <LatestTrailersSection onPlay={handlePlayTrailer} />

      <PopularSection />

      <FreeToWatchSection />

      {playingId && (
        <TrailerModal id={playingId} type={playingType} onClose={() => setPlayingId(null)} />
      )}
    </>
  );
};

export default Home;
