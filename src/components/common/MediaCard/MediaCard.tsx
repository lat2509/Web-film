import type { MovieType } from "@app-types/entity";
import { formatDate, getRatingHexColor } from "@utils/formatters";

import {
  CardContainer,
  CardDate,
  CardImage,
  CardTitle,
  ImageWrapper,
  RatingCircle,
  TextContent,
} from "./MediaCard.styles";

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
      <RatingCircle scorecolor={ratingHex}>{rating}</RatingCircle>

      {/* Content Section */}
      <TextContent>
        <CardTitle title={title}>{title}</CardTitle>
        <CardDate>{formatDate(rawDate)}</CardDate>
      </TextContent>
    </CardContainer>
  );
};

export default MediaCard;
