import {
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  type SelectChangeEvent,
  Autocomplete,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Hooks & Utils
import { useCatalog } from "@hooks/useCatalog";
import { formatDate } from "@utils/formatters";
import { getRatingHexColor } from "@utils/formatters";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
// Components
import AvailabilitiesFilter from "@components/common/AvailabilitiesFilter/AvailabilitiesFilter";

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
  SearchContainer,
  SearchButton,
} from "@components/catalog/Catalog.styles";
import type { MovieType } from "@app-types/entity";
// Constant
import {
  AVAILABILITIES_OPTIONS_1,
  RELEASE_DATE_OPTIONS_1,
  SORT_OPTIONS,
  DEFAULT_SORT,
} from "@utils/constants";
import { useCountry, type Country } from "@hooks/useCountry";
import Loading from "@components/common/Loading";

interface CatalogTemplateProps {
  catalogName: string;
  type: "movie" | "tv";
  category: string;
}

const CatalogTemplate = ({ catalogName, type, category }: CatalogTemplateProps) => {
  const envImgUrl = import.meta.env.VITE_TMDB_IMG_URL;

  // --- GỌI HOOK ---
  const [filters, setFilters] = useState({
    sort_by: DEFAULT_SORT,
    watch_region: "US",
    availabilities: [] as string[],
    release_types: [] as string[],
  });

  const [activeFilters, setActiveFilters] = useState(filters);

  const { data: countries = [] } = useCountry();

  const { flatData, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useCatalog({
    type,
    category,
    filters: activeFilters,
  });

  const handleSortChange = (e: SelectChangeEvent) => {
    setFilters((prev) => ({ ...prev, sort_by: e.target.value }));
  };

  const handleFilterChange = (
    key: "availabilities" | "release_types",
    newValue: (string | number)[],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleSearch = () => {
    setActiveFilters(filters);
  };

  const handleChangeCountry = (
    _e: React.SyntheticEvent<Element, Event>,
    newValue: Country | null,
  ) => {
    setFilters((prev) => ({
      ...prev,
      watch_region: newValue ? newValue.iso_3166_1 : "US",
    }));
  };
  const isSearchDisabled = JSON.stringify(filters) === JSON.stringify(activeFilters);
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
                  <Select label="Sort" value={filters.sort_by} onChange={handleSortChange}>
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
                <Box mb={2} pb={2} borderBottom={1} borderColor="divider">
                  <Typography variant="body2" mb={2}>
                    Country (region)
                  </Typography>
                  <Autocomplete
                    options={countries}
                    getOptionLabel={(option: Country) => option.english_name}
                    value={
                      countries.find((c: Country) => c.iso_3166_1 === filters.watch_region) || null
                    }
                    onChange={handleChangeCountry}
                    disableClearable
                    renderInput={(params) => (
                      <TextField {...params} size="small" placeholder="Filter" />
                    )}
                  />
                </Box>
                <Box pb={2} mb={2} borderBottom={1} borderColor="divider">
                  <Typography variant="body2" mb={1}>
                    Availabilities
                  </Typography>
                  <AvailabilitiesFilter
                    type="Search all availabilities?"
                    options={AVAILABILITIES_OPTIONS_1}
                    selectedValues={filters.availabilities}
                    onChange={(vals) => handleFilterChange("availabilities", vals)}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" mb={1}>
                    Release Dates
                  </Typography>
                  <AvailabilitiesFilter
                    type="Search all release?"
                    options={RELEASE_DATE_OPTIONS_1}
                    selectedValues={filters.release_types}
                    onChange={(vals) => handleFilterChange("release_types", vals)}
                  />
                </Box>
              </AccordionDetails>
            </StyledAccordion>
            <SearchContainer>
              <SearchButton variant="contained" onClick={handleSearch} disabled={isSearchDisabled}>
                Search
              </SearchButton>
            </SearchContainer>
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
                      <Link to="/$mediaType/$id" params={{ mediaType: type, id: String(movie.id) }}>
                        <CardImage
                          src={
                            movie.poster_path
                              ? `${envImgUrl}${movie.poster_path}`
                              : "/placeholder.jpg"
                          }
                          alt={_title}
                          loading="lazy"
                        />
                      </Link>
                    </Box>
                    <RatingCircle scorecolor={ratingHex}>{rating}</RatingCircle>
                    <CardContent>
                      <Link to="/$mediaType/$id" params={{ mediaType: type, id: String(movie.id) }}>
                        <CardTitle title={_title}>{_title}</CardTitle>
                      </Link>
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

            {isFetching && !isFetchingNextPage && <Loading />}
          </MainContent>
        </LayoutContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default CatalogTemplate;
