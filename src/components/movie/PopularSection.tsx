import { useState } from "react";
import MediaSection from "@components/common/MediaSection";
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
      onToggle={setType}
      data={data}
    />
  );
};

export default PopularSection;
