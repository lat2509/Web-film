import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mediaList } from "@api/moviesApi";
import type { MovieType } from "@app-types/type";
import { formatDate } from "@utils/formatters";

// MUI Imports
import {
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Internal Components
import AvailabilitiesFilter from "./AvailabilitiesFilter";

// IMPORT STYLED COMPONENTS
import {
  PageContainer,
  ContentWrapper,
  PageTitle,
  LayoutContainer,
  Sidebar,
  StyledAccordion,
  FilterTitle,
  MainContent,
  GridContainer,
  CardWrapper,
  CardImage,
  RatingCircle,
  CardContent,
  CardTitle,
  CardDate,
  LoadMoreButton,
} from "@styles/catalog.styles";

// Constants
const AVAILABILITIES_OPTIONS = ["Stream", "Free", "Ads", "Rent", "Buy", "Coming Soon"] as const;
const RELEASE_DATE_OPTIONS = [
  "Theatrical (limited)",
  "Theatrical",
  "Premiere",
  "Digital",
  "Physical",
  "TV",
] as const;
const SORT_OPTIONS = [
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Release Date Descending", value: "primary_release_date.desc" },
  { label: "Release Date Ascending", value: "primary_release_date.asc" },
  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },
] as const;

const getRatingColor = (vote: number): string => {
  if (vote >= 7) return "#21d07a";
  if (vote >= 4 && vote < 7) return "#d2d531";
  return "#db2360";
};

interface CatalogTemplateProps {
  catalogName: string;
  type: "movie" | "tv";
  category: string;
}

const CatalogTemplate = ({ catalogName, type, category }: CatalogTemplateProps) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["movie", category, type],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await mediaList(type, category, "en-US", pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Title */}
        <PageTitle variant="h5">{catalogName}</PageTitle>

        <LayoutContainer>
          {/* --- LEFT SIDEBAR (Filter & Sort) --- */}
          <Sidebar>
            {/* Sort Accordion */}
            <StyledAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FilterTitle>Sort</FilterTitle>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Sort Results By
                </Typography>
                <FormControl size="small" fullWidth>
                  <InputLabel>Sort</InputLabel>
                  <Select label="Sort" defaultValue="">
                    {SORT_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AccordionDetails>
            </StyledAccordion>

            {/* Filters Accordion */}
            <StyledAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FilterTitle>Filters</FilterTitle>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Availabilities
                  </Typography>
                  <AvailabilitiesFilter
                    type="Search all availabilities?"
                    options={[...AVAILABILITIES_OPTIONS]}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Release Dates
                  </Typography>
                  <AvailabilitiesFilter
                    type="Search all release?"
                    options={[...RELEASE_DATE_OPTIONS]}
                  />
                </Box>
              </AccordionDetails>
            </StyledAccordion>
          </Sidebar>

          {/* --- RIGHT CONTENT (Grid Movies) --- */}
          <MainContent>
            <GridContainer>
              {data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((movie: MovieType) => {
                    const _title = movie.title || movie.name;
                    const rating = Math.round(movie.vote_average * 10) / 10;
                    // Lấy mã màu hex cho styled component
                    const ratingHexColor = getRatingColor(movie.vote_average);
                    const releaseDate = movie.release_date ?? movie.first_air_date;

                    return (
                      <CardWrapper key={movie.id}>
                        {/* Image */}
                        <Box sx={{ overflow: "hidden" }}>
                          <CardImage
                            src={
                              movie.poster_path
                                ? `${envImgUrl}${movie.poster_path}`
                                : "/placeholder.jpg"
                            }
                            alt={_title}
                            title={_title}
                            loading="lazy"
                          />
                        </Box>

                        {/* Rating Circle: Truyền prop scoreColor vào */}
                        <RatingCircle scoreColor={ratingHexColor}>{rating}</RatingCircle>

                        {/* Text Content */}
                        <CardContent>
                          <CardTitle title={_title}>{_title}</CardTitle>
                          <CardDate>{formatDate(releaseDate)}</CardDate>
                        </CardContent>
                      </CardWrapper>
                    );
                  })}
                </Fragment>
              ))}
            </GridContainer>

            {/* Load More Button */}
            <LoadMoreButton
              variant="contained"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetching}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </LoadMoreButton>

            {isFetching && !isFetchingNextPage && (
              <Box sx={{ mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </MainContent>
        </LayoutContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default CatalogTemplate;
