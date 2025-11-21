import { useQuery } from "@tanstack/react-query";
import type { TrailerModalProp } from "../../types/type";
import { useRef, useEffect } from "react";
import type { VidType } from "../../types/type";
import { trailerVideo } from "../../api/moviesApi";
import { IoClose } from "react-icons/io5";

const TrailerModal = ({ id, type, onClose }: TrailerModalProp) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: videoTrailer, isLoading } = useQuery({
    queryKey: ["videoTrailer", id, type],
    queryFn: async () => {
      const res = await trailerVideo(type, id, "en-US");
      const results = res.data.results;
      const trailers = results.find(
        (vid: VidType) => vid.type === "Trailer" && vid.site === "YouTube",
      );
      return trailers;
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (id && dialog) {
      if (!dialog.open) dialog.showModal();
    }
  }, [id]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto flex h-full w-full flex-col items-center justify-center bg-transparent p-0 outline-none backdrop:bg-black/80"
      onClose={onClose}
    >
      <div className="flex w-5/6 justify-between rounded-t-md bg-black text-white">
        <p className="p-3 text-2xl">{videoTrailer?.name || "No Trailer Available"}</p>
        <button onClick={onClose} className="cursor-pointer p-5 outline-0">
          <IoClose className="rounded-md border-transparent text-2xl hover:border-3 hover:border-gray-400" />
        </button>
      </div>

      <div className="h-11/12 w-5/6">
        {isLoading ? (
          <div>Loading...</div>
        ) : videoTrailer ? (
          <iframe
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="h-full w-full rounded-b-md"
            src={`https://www.youtube.com/embed/${videoTrailer?.key}`}
          ></iframe>
        ) : (
          <div className="flex h-11/12 w-5/6 items-center justify-center text-4xl text-gray-400">
            No Trailer Available
          </div>
        )}
      </div>
    </dialog>
  );
};

export default TrailerModal;
