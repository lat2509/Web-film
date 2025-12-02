import { useState } from "react";
import LatestTrailers from "@components/home/LatestTrailers";
import { useLatestTrailers } from "@hooks/useHomeData";

interface LatestTrailersSectionProps {
  onPlay: (id: number, type: "movie" | "tv") => void;
}

const LatestTrailersSection = ({ onPlay }: LatestTrailersSectionProps) => {
  const [trailerType, setTrailerType] = useState<"popular" | "on_tv" | "in_theaters">("popular");

  const { data = [] } = useLatestTrailers(trailerType);

  return (
    <LatestTrailers
      data={data}
      value={trailerType}
      onToggle={setTrailerType}
      onPlay={(id) => {
        const playType = trailerType === "on_tv" ? "tv" : "movie";
        onPlay(id, playType);
      }}
    />
  );
};

export default LatestTrailersSection;
