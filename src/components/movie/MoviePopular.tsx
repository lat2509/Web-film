import { Accordion } from "radix-ui"
import { FaAngleRight } from "react-icons/fa";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AvailabilitiesFilter from "./AvailabilitiesFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { popularList } from "../../api/moviesApi";
import type { MovieType } from "../../types/type";
import { Fragment } from "react/jsx-runtime";

const MoviePopular = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movie', 'popular'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await popularList("movie", 'en-US', pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.page,
  })

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
          <p className="font-bold text-xl">Popular Movies</p>
        </div>
        <div className="flex flex-row">
          <div className="w-65">
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
          <div>
            content
            {data?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((movie: MovieType) => (
                  <p key={movie.id}>{movie.title}</p>
                ))}
              </Fragment>
            ))}
            <div>
              <button
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

export default MoviePopular;