import { useMemo } from "react";
import { Box } from "@mui/material";
import type { MovieType } from "@app-types/type";
import { formatDate } from "@utils/formatters";

// IMPORT STYLED COMPONENTS
import {
  CardContainer,
  ImageWrapper,
  CardImage,
  RatingCircle,
  CardTitle,
  CardDate,
} from "@styles/movieCard.styles";

const getRatingHexColor = (vote: number): string => {
  if (vote >= 7) return "#21d07a";
  if (vote >= 4 && vote < 7) return "#d2d531";
  return "#db2360";
};

const MediaCard = ({ movie }: { movie: MovieType }) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  const memoizedData = useMemo(() => {
    const title = movie.title ?? movie.name;
    const rawDate = movie.release_date ?? movie.first_air_date;
    const rating = Math.round(movie.vote_average * 10) / 10;
    const ratingHex = getRatingHexColor(movie.vote_average);

    return { title, rawDate, rating, ratingHex };
  }, [movie.title, movie.name, movie.release_date, movie.first_air_date, movie.vote_average]);

  const { title, rawDate, rating, ratingHex } = memoizedData;

  return (
    <CardContainer>
      {/* Image Section */}
      <ImageWrapper>
        <CardImage
          src={movie.poster_path ? `${envImgUrl}${movie.poster_path}` : "/placeholder.jpg"}
          alt={title}
          title={title}
          loading="lazy"
        />
      </ImageWrapper>

      {/* Rating Circle: Truyền trực tiếp prop scoreColor */}
      <RatingCircle scoreColor={ratingHex}>{rating}</RatingCircle>

      {/* Content Section */}
      <Box sx={{ px: 1 }}>
        <CardTitle title={title}>{title}</CardTitle>
        <CardDate>{formatDate(rawDate)}</CardDate>
      </Box>
    </CardContainer>
  );
};

export default MediaCard;
