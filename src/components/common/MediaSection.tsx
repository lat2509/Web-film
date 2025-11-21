// src/components/home/MediaSection.tsx
import SwitchToggle from "../common/SwitchToggle";
import MediaCard from "../common/MediaCard";
import type { MediaSectionProps } from "../../types/type";

const MediaSection = ({ title, items, value, onToggle, data }: MediaSectionProps) => {
  return (
    <div className="h-[430px] w-full">
      <div className="mx-auto w-5/6 pt-7">
        <div className="flex flex-row items-center gap-5">
          <p className="text-2xl font-semibold">{title}</p>
          <SwitchToggle items={items} value={value} onToggle={onToggle} />
        </div>
        <div className="flex flex-row overflow-x-scroll py-5">
          {data.map((movie) => (
            <MediaCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
