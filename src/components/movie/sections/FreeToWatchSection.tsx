import { useState } from "react";
import MediaSection from "@components/common/MediaSection/MediaSection";
import { useFreeToWatch } from "@hooks/useHomeData";
const FreeToWatchSection = () => {
  const [type, setType] = useState<"movie" | "tv">("movie");
  const { data = [] } = useFreeToWatch(type);

  return (
    <MediaSection
      title="Free To Watch"
      items={[
        { label: "Movies", value: "movie" },
        { label: "On TV", value: "tv" },
      ]}
      value={type}
      onToggle={(val) => setType(val as "movie" | "tv")}
      data={data}
    />
  );
};

export default FreeToWatchSection;
