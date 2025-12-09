import { memo } from "react";

// Types
import type { MovieType } from "@app-types/type";

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

export interface MediaSectionProps<T extends string> {
  title: string;
  items: { label: string; value: T }[];
  value: T;
  onToggle: (val: T) => void;
  data: MovieType[]; // Sử dụng Entity đã định nghĩa chung
}

const MediaList = memo(({ data }: { data: MovieType[] }) => (
  <HorizontalScroll>
    {data.map((movie) => (
      <MediaCard key={movie.id} movie={movie} />
    ))}
  </HorizontalScroll>
));

MediaList.displayName = "MediaList";

const MediaSection = memo(
  <T extends string>({ title, items, value, onToggle, data }: MediaSectionProps<T>) => {
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
  },
);

MediaSection.displayName = "MediaSection";

export default MediaSection;
