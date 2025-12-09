// components/SearchResultItem.tsx
import { useMemo } from "react";
import type { SearchResultsFilm } from "@app-types/type";
import { formatDate } from "@utils/formatters";
import { Typography, Box } from "@mui/material";
// Import các styled components vừa tạo
import {
  SimpleCard,
  DetailedCard,
  ImageWrapper,
  PosterImage,
  ContentWrapper,
  TitleText,
  DescriptionText,
} from "@styles/SearchResultItem.styles";

// --- TYPES & INTERFACES ---
interface SearchResultItemProps {
  item: SearchResultsFilm;
  type: string;
}

interface NormalizedData {
  title: string;
  image: string;
  subtitle: string;
  description: string;
}

const IMG_BASE_URL = import.meta.env.VITE_TMDB_IMG_URL;
const PLACEHOLDER_IMG = "https://placehold.co/200x300?text=No+Image";

// --- LOGIC NORMALIZATION (Giữ nguyên vì nó đã tốt) ---
const normalizeData = (item: any, type: string): NormalizedData => {
  const path = item.poster_path || item.profile_path || item.backdrop_path;
  const image = path ? `${IMG_BASE_URL}${path}` : PLACEHOLDER_IMG;
  const title = item.title || item.name || "Untitled";
  const dateStr = item.release_date || item.first_air_date;
  const subtitle = type !== "person" && dateStr ? formatDate(dateStr) : "";

  let description = item.overview || "No description available";
  if (type === "person" && item.known_for) {
    const knownWorks = item.known_for.map((work: any) => work.title || work.name).join(", ");
    description = `Known for: ${knownWorks}`;
  }

  return { title, image, subtitle, description };
};

// --- MAIN COMPONENT ---
const SearchResultItem = ({ item, type }: SearchResultItemProps) => {
  const data = useMemo(() => normalizeData(item, type), [item, type]);
  const isSimpleView = type === "company" || type === "keyword";

  // VIEW 1: Simple (Company/Keyword)
  if (isSimpleView) {
    return (
      <SimpleCard elevation={1}>
        <TitleText variant="h6">{data.title}</TitleText>
      </SimpleCard>
    );
  }

  // VIEW 2: Detailed (Movie/TV/Person)
  return (
    <DetailedCard elevation={1}>
      <ImageWrapper>
        <PosterImage src={data.image} alt={data.title} />
      </ImageWrapper>

      <ContentWrapper>
        <Box>
          <TitleText variant="h6">{data.title}</TitleText>

          {data.subtitle && (
            <Typography variant="body2" color="text.secondary">
              {data.subtitle}
            </Typography>
          )}
        </Box>

        <DescriptionText variant="body2">{data.description}</DescriptionText>
      </ContentWrapper>
    </DetailedCard>
  );
};

export default SearchResultItem;
