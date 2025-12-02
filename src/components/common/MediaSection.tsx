import { memo } from "react";

// Types
import type { MediaSectionProps, MovieType } from "@app-types/type";

// Components
import SwitchToggle from "@components/common/SwitchToggle";
import MediaCard from "@components/common/MediaCard";

import {
  SectionContainer,
  ContentWrapper,
  SectionHeader,
  SectionTitle,
  HorizontalScroll,
} from "@styles/TrendingSection.styles";

const MediaList = memo(({ data }: { data: MovieType[] }) => (
  <HorizontalScroll>
    {data.map((movie) => (
      <MediaCard key={movie.id} movie={movie} />
    ))}
  </HorizontalScroll>
));

MediaList.displayName = "MediaList";

const MediaSection = memo(({ title, items, value, onToggle, data }: MediaSectionProps) => {
  return (
    <SectionContainer hasBackground={false}>
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
