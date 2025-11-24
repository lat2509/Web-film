import { Accordion } from "radix-ui"
import { FaAngleRight } from "react-icons/fa";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AvailabilitiesFilter from "./AvailabilitiesFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mediaList } from "../../api/moviesApi";
import type { MovieType } from "../../types/type";
import { Fragment } from "react/jsx-runtime";
import { formatDate, getColorRating } from "../../utils/formatters";

interface CatalogTemplateProps {
  catalogName: string;
  type: "movie" | "tv";
  category: string;
}

const CatalogTemplate = ({ catalogName, type, category }: CatalogTemplateProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movie', category],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await mediaList(type, category, 'en-US', pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  })

  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  const availabilitiesOPTIONS = [
    "Stream",
    "Free",
    "Ads",
    "Rent",
    "Buy",
    "Coming Soon"
  ];

  const releaseDateOptions = [
    "Theatrical (limited)",
    "Theatrical",
    "Premiere",
    "Digital",
    "Physical",
    "TV",
  ]

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1400px] px-10 py-7.5">
        <div className="w-full mb-5">
          <p className="font-bold text-xl">
            {/* Popular Movies */}
            {catalogName}
          </p>
        </div>
        <div className="flex flex-row">
          <div className="min-w-65">
            <Accordion.Root className="w-full"
              type="multiple"
              defaultValue={['item-1,item-2']}
            >
              <Accordion.Item
                className="w-full border border-gray-300 rounded-lg" value="item-1"
              >
                <Accordion.Trigger className="w-full h-12 shadow-2xs px-2 group">
                  <div className="flex justify-between items-center w-full h-full">
                    <p className="font-semibold">Sort</p>
                    <FaAngleRight className="transform group-data-[state=open]:rotate-90" />
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="flex flex-col p-2">
                    <p className="p-1">Sort Results By</p>
                    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">sort</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                      >
                        <MenuItem>Popularity Descending</MenuItem>
                        <MenuItem>Popularity Ascending</MenuItem>
                        <MenuItem>Rating Descending</MenuItem>
                        <MenuItem>Rating Ascending</MenuItem>
                        <MenuItem>Release Date Descending</MenuItem>
                        <MenuItem>Release Date Ascending</MenuItem>
                        <MenuItem>Title(A-Z)</MenuItem>
                        <MenuItem>Title(Z-A)</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item
                className="w-full border border-gray-300 rounded-lg mt-4" value="item-2"
              >
                <Accordion.Trigger className="w-full h-12 shadow-2xs px-2 group">
                  <div className="flex justify-between items-center w-full h-full">
                    <p className="font-semibold">Filters</p>
                    <FaAngleRight className="transform group-data-[state=open]:rotate-90" />
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="p-2">
                    <div className="flex flex-col border-b border-gray-400">
                      <p>Availabilities</p>
                      <AvailabilitiesFilter type="Search all availabilities?" options={availabilitiesOPTIONS} />
                    </div>
                    <div className="flex flex-col mt-2">
                      <p>Release Dates</p>
                      <AvailabilitiesFilter type="Search all release?" options={releaseDateOptions} />
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row flex-wrap justify-center">
              {data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((movie: MovieType) => {
                    return (
                      <div key={movie.id} className="flex flex-col mb-7.5 gap-2 h-93 max-w-46 ml-6 rounded-md border border-gray-300 shadow-xl relative">
                        <div>
                          <img
                            src={`${envImgUrl}${movie.poster_path}`}
                            alt={movie.title || movie.name}
                            title={movie.title || movie.name}
                            className="rounded-t-md h-68 hover:cursor-pointer" />
                        </div>
                        <div>
                          <div className="absolute flex top-63 left-3 h-10 w-10 rounded-full border-2 border-black">
                            <div
                              className={`border-2 ${getColorRating(movie.vote_average)} h-9 w-9 rounded-full bg-black text-center text-white`}
                            >
                              <p className="leading-8">{Math.round(movie.vote_average * 10) / 10}</p>
                            </div>
                          </div>
                          <div className="h-18 p-2 mt-3 ml-1">
                            <p
                              title={movie.title || movie.name}
                              className="line-clamp-2 cursor-pointer overflow-hidden leading-snug font-bold text-black hover:text-blue-500"
                            >
                              {movie.title || movie.name}
                            </p>
                            <p className="text-gray-500">{formatDate(movie.release_date ?? movie.first_air_date)}</p>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </Fragment>
              ))}
            </div>
            <div className="bg-blue-600 w-10/12 rounded-md py-2 text-center text-2xl text-white font-bold">
              <button className="hover:cursor-pointer"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
              </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogTemplate;