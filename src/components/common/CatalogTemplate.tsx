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

// Hooks & Utils
import { useCatalog } from "@hooks/useCatalog";
import { formatDate } from "@utils/formatters";
import { getRatingHexColor } from "@utils/formatters";

// Components
import AvailabilitiesFilter from "./AvailabilitiesFilter";

// Styles
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
} from "@styles/Catalog.styles";
import type { MovieType } from "@app-types/type";

// Constants
const AVAILABILITIES_OPTIONS = ["Stream", "Free", "Ads", "Rent", "Buy", "Coming Soon"];
const RELEASE_DATE_OPTIONS = [
  "Theatrical (limited)",
  "Theatrical",
  "Premiere",
  "Digital",
  "Physical",
  "TV",
];
const SORT_OPTIONS = [
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Release Date Descending", value: "primary_release_date.desc" },
  { label: "Release Date Ascending", value: "primary_release_date.asc" },
  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },
];

interface CatalogTemplateProps {
  catalogName: string;
  type: "movie" | "tv";
  category: string;
}

const CatalogTemplate = ({ catalogName, type, category }: CatalogTemplateProps) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  // --- GỌI HOOK ---
  const { flatData, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useCatalog({
    type,
    category,
  });

  return (
    <PageContainer>
      <ContentWrapper>
        <PageTitle variant="h5">{catalogName}</PageTitle>

        <LayoutContainer>
          {/* --- SIDEBAR --- */}
          <Sidebar>
            <StyledAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FilterTitle>Sort</FilterTitle>
              </AccordionSummary>
              <AccordionDetails>
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
                    options={AVAILABILITIES_OPTIONS}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Release Dates
                  </Typography>
                  <AvailabilitiesFilter type="Search all release?" options={RELEASE_DATE_OPTIONS} />
                </Box>
              </AccordionDetails>
            </StyledAccordion>
          </Sidebar>

          {/* --- MAIN CONTENT --- */}
          <MainContent>
            <GridContainer>
              {flatData.map((movie: MovieType) => {
                const _title = movie.title || movie.name;
                const rating = Math.round(movie.vote_average * 10) / 10;
                const ratingHex = getRatingHexColor(rating);
                const releaseDate = movie.release_date ?? movie.first_air_date;

                return (
                  <CardWrapper key={movie.id}>
                    <Box sx={{ overflow: "hidden" }}>
                      <CardImage
                        src={
                          movie.poster_path
                            ? `${envImgUrl}${movie.poster_path}`
                            : "/placeholder.jpg"
                        }
                        alt={_title}
                        loading="lazy"
                      />
                    </Box>
                    <RatingCircle scorecolor={ratingHex}>{rating}</RatingCircle>
                    <CardContent>
                      <CardTitle title={_title}>{_title}</CardTitle>
                      <CardDate>{formatDate(releaseDate)}</CardDate>
                    </CardContent>
                  </CardWrapper>
                );
              })}
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
