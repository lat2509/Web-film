import { useState } from "react";
import MediaSection from "@components/common/MediaSection/MediaSection";
import { usePopular } from "@hooks/useHomeData";

const PopularSection = () => {
  const [type, setType] = useState<"movie" | "tv">("movie");
  const { data = [] } = usePopular(type);

  return (
    <MediaSection
      title="What's Popular"
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

export default PopularSection;
