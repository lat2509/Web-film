import { memo } from "react";
import SwitchToggle from "@components/common/SwitchToggle";
import MediaCard from "@components/common/MediaCard";
import type { MediaSectionProps } from "@app-types/type";

// IMPORT STYLED COMPONENTS
import {
  SectionContainer,
  ContentWrapper,
  SectionHeader,
  SectionTitle,
  HorizontalScroll,
} from "@styles/trendingSection.styles";

// Component hiển thị list
const MediaList = memo(({ data }: { data: any[] }) => (
  <HorizontalScroll>
    {data.map((movie) => (
      <MediaCard key={movie.id} movie={movie} />
    ))}
  </HorizontalScroll>
));

MediaList.displayName = "MediaList";

const MediaSection = memo(({ title, items, value, onToggle, data }: MediaSectionProps) => {
  return (
    <SectionContainer sx={{ backgroundImage: "none", pt: 2 }}>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          <SwitchToggle items={items} value={value} onToggle={onToggle} />
        </SectionHeader>

        <MediaList data={data} />
      </ContentWrapper>
    </SectionContainer>
  );
});

MediaSection.displayName = "MediaSection";

export default MediaSection;
