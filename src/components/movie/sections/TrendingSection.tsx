import { useState } from "react";
import MediaSection from "@components/common/MediaSection/MediaSection";
import { useTrending } from "@hooks/useHomeData";

const TrendingSection = () => {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const { data = [] } = useTrending(timeWindow);

  return (
    <MediaSection
      title="Trending"
      items={
        [
          { label: "Today", value: "day" },
          { label: "This Week", value: "week" },
        ] as const
      }
      value={timeWindow}
      onToggle={(val) => setTimeWindow(val as "day" | "week")}
      data={data}
    />
  );
};

export default TrendingSection;
