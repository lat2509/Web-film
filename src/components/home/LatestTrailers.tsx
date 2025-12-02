import { useState } from "react";
import { FaPlay } from "react-icons/fa";

// Components
import SwitchToggle from "@components/common/SwitchToggle";
import TrailerName from "./TrailerName";

// Types
import type { LatestTrailersProps } from "@app-types/type";

// Styled Components
import {
  TrailerSection,
  ContentWrapper,
  SectionHeader,
  SectionTitle,
  ScrollContainer,
  TrailerCard,
  ImageWrapper,
  TrailerImage,
  PlayIconOverlay,
  MovieTitle,
  MovieSubtitle,
} from "@styles/LatestTrailer.styles";

const LatestTrailers = ({ data, value, onToggle, onPlay }: LatestTrailersProps) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  const [hoveredBackdrop, setHoveredBackdrop] = useState<string | null>(null);

  const currentType = value === "on_tv" ? "tv" : "movie";

  const currentBgImage = hoveredBackdrop || data?.[0]?.backdrop_path || "";

  return (
    <TrailerSection bgImage={currentBgImage ? `${envImgUrl}${currentBgImage}` : ""}>
      <ContentWrapper>
        {/* Header: Title + Toggle Switch */}
        <SectionHeader>
          <SectionTitle>Latest Trailers</SectionTitle>
          <SwitchToggle
            items={[
              { label: "Popular", value: "popular" },
              { label: "On TV", value: "on_tv" },
              { label: "In Theaters", value: "in_theaters" },
            ]}
            value={value}
            onToggle={onToggle}
          />
        </SectionHeader>

        {/* Horizontal Scroll List */}
        <ScrollContainer>
          {data.map((movie) => (
            <TrailerCard
              key={movie.id}
              onMouseEnter={() => setHoveredBackdrop(movie.backdrop_path)}
            >
              <ImageWrapper onClick={() => onPlay(movie.id)}>
                <TrailerImage
                  src={`${envImgUrl}${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className="trailer-img"
                />

                <PlayIconOverlay>
                  <FaPlay className="play-icon" />
                </PlayIconOverlay>
              </ImageWrapper>

              <MovieTitle>{movie.title || movie.name}</MovieTitle>

              <MovieSubtitle>
                <TrailerName id={movie.id} type={currentType} />
              </MovieSubtitle>
            </TrailerCard>
          ))}
        </ScrollContainer>
      </ContentWrapper>
    </TrailerSection>
  );
};

export default LatestTrailers;
