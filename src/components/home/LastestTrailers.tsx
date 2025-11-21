// src/components/home/LatestTrailers.tsx
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import SwitchToggle from "../common/SwitchToggle";
import type { LatestTrailersProps } from "../../types/type";
import TrailerName from "./TrailerName";

const LatestTrailers = ({ data, value, onToggle, onPlay }: LatestTrailersProps) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;
  const [bgTrailerImg, setBgTrailerImg] = useState("");
  const currentType = value === "on_tv" ? "tv" : "movie";
  useEffect(() => {
    if (data && data.length > 0) {
      setBgTrailerImg(data[0].backdrop_path);
    }
  }, [data]);

  return (
    <div
      className="h-[360px] w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)),url(${envImgUrl}${bgTrailerImg})`,
      }}
    >
      <div className="mx-auto w-5/6 pt-7">
        <div className="flex flex-row items-center gap-5 text-white">
          <p className="text-2xl font-semibold">Lastest Trailers</p>
          <SwitchToggle
            items={[
              { label: "Popular", value: "popular" },
              { label: "On TV", value: "on_tv" },
              { label: "In Theaters", value: "in_theaters" },
            ]}
            value={value}
            onToggle={onToggle}
          />
        </div>
        <div className="flex flex-row overflow-x-scroll py-5">
          {data.map((movie) => (
            <div
              key={movie.id}
              className="relative mr-10 cursor-pointer"
              onMouseEnter={() => setBgTrailerImg(movie.backdrop_path)}
            >
              <div
                className="group"
                onClick={() => {
                  onPlay(movie.id);
                }}
              >
                <img
                  src={`${envImgUrl}${movie.backdrop_path}`}
                  alt={movie.backdrop_path}
                  className="max-h-44 max-w-80 rounded-md object-cover group-hover:scale-115"
                />
                <div className="absolute inset-0 bottom-17 left-4 flex items-center justify-center">
                  <FaPlay className="text-4xl text-white group-hover:scale-200" />
                </div>
              </div>
              <div className="flex flex-col text-center text-white">
                <p className="cursor-text py-3 leading-snug font-bold">
                  {movie.title || movie.name}
                </p>
                <p className="italic">
                  <TrailerName id={movie.id} type={currentType} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTrailers;
