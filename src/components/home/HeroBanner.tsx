import type { HeroBannerProps } from "../../types/type";

const HeroBanner = ({ bgImage }: HeroBannerProps) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url(${bgImage})`,
      }}
      className="flex h-[360px] w-full flex-col justify-center gap-12 bg-cover bg-no-repeat px-10 py-8"
    >
      <div className="mx-40 flex flex-col justify-center gap-12">
        <div className="text-white">
          <h2 className="text-5xl font-bold">Welcome.</h2>
          <h3 className="text-2xl font-semibold">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <div className="relative w-full">
          <form>
            <label htmlFor="inner-search">
              <input
                type="text"
                id="inner-search"
                className="w-full rounded-full bg-white px-5 py-3 text-gray-500 outline-0"
                placeholder="Search for a movie, tv show,..."
              />
              <button className="absolute right-0 rounded-4xl bg-linear-to-r from-[#1ed5a9] to-[#01b4e4] px-5 py-3 text-white">
                Search
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
