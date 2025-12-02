import type { MovieType } from "@app-types/type";
import { formatDate, getRatingHexColor } from "@utils/formatters";

import {
  CardContainer,
  ImageWrapper,
  CardImage,
  RatingCircle,
  TextContent,
  CardTitle,
  CardDate,
} from "@styles/MovieCard.styles";

const MediaCard = ({ movie }: { movie: MovieType }) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;
  const title = movie.title ?? movie.name;
  const rawDate = movie.release_date ?? movie.first_air_date;
  const rating = Math.round(movie.vote_average * 10) / 10;
  const ratingHex = getRatingHexColor(rating);

  // Logic ảnh poster
  const posterSrc = movie.poster_path ? `${envImgUrl}${movie.poster_path}` : "/placeholder.jpg";
  return (
    <CardContainer>
      {/* Image Section */}
      <ImageWrapper>
        <CardImage src={posterSrc} alt={title} title={title} loading="lazy" />
      </ImageWrapper>

      {/* Rating Circle */}
      <RatingCircle scoreColor={ratingHex}>{rating}</RatingCircle>

      {/* Content Section */}
      <TextContent>
        <CardTitle title={title}>{title}</CardTitle>
        <CardDate>{formatDate(rawDate)}</CardDate>
      </TextContent>
    </CardContainer>
  );
};

export default MediaCard;
