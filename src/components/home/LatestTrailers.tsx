import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
// Components
import SwitchToggle from "@components/common/SwitchToggle/SwitchToggle";
import TrailerName from "./TrailerName";

// Types
import type { MediaType } from "@app-types/entity";

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
} from "./LatestTrailers.styles";

export interface LatestTrailersProps {
  data: MediaType[];
  value: "popular" | "on_tv" | "in_theaters";
  onToggle: (val: "popular" | "on_tv" | "in_theaters") => void;
  onPlay: (id: number) => void;
}

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

              <Link to="/$mediaType/$id" params={{ mediaType: currentType, id: String(movie.id) }}>
                <MovieTitle>{movie.title || movie.name}</MovieTitle>
              </Link>

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
