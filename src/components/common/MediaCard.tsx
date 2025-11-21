// src/components/common/MediaCard.tsx
import type { MovieType } from "../../types/type";
import { getColorRating, formatDate } from "../../utils/formatters";

const MediaCard = ({ movie }: { movie: MovieType }) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;
  const _title = movie.title ?? movie.name;
  const _rawDate = movie.release_date ?? movie.first_air_date;

  return (
    <div className="relative mr-5 min-h-[300px] w-[150px] flex-none">
      <div className="shadow-2xl">
        <img
          src={`${envImgUrl}${movie.poster_path}`}
          alt={`${_title}`}
          className="min-h-56 min-w-[150px] cursor-pointer rounded-md object-cover"
          title={_title}
        />
      </div>
      <div>
        <div className="absolute top-51 left-2 h-10 w-10 rounded-full border-2 border-black">
          <div
            className={`border-2 ${getColorRating(movie.vote_average)} h-9 w-9 rounded-full bg-black text-center text-white`}
          >
            <p className="leading-8">{Math.round(movie.vote_average * 10) / 10}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col text-[16px] leading-snug">
          <h3
            className="line-clamp-2 h-14 cursor-pointer overflow-hidden py-3 leading-snug font-bold text-black hover:text-blue-500"
            title={_title}
          >
            {_title}
          </h3>
          <p className="text-gray-500">{formatDate(_rawDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
