import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getDetails, type MediaType } from "@api/moviesApi";
import { useState } from "react";
import { Box, Typography, CircularProgress, Tooltip, Stack } from "@mui/material";
import Loading from "@components/common/Loading";
import TrailerModal from "@components/common/TrailerModal/TrailerModal";
import { toast } from "react-toastify";
// Import Icons
import ListIcon from "@mui/icons-material/List";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import {
  DetailsContentOverview,
  DetailsActionsWrapper,
  DetailsContentTitle,
  DetailsContentWrapper,
  HeroDetailsContainer,
  HeroDetailsWrapper,
  PosterImg,
  PosterWrapper,
  SubTitleText,
  TitleText,
  ActionButton,
  ScoreCircleWrapper,
  TaglineText,
  CrewGrid,
  CrewItem,
  CrewName,
  CrewJob,
  MainContentContainer,
  LeftColumn,
  RightColumn,
  SectionTitle,
  CastScroller,
  CastCard,
  CastImg,
  CastInfo,
  ActorName,
  CharacterName,
} from "./MovieDetailPage.styles";
import { formatDate, formatRuntime } from "@utils/formatters";
import type { Cast, Creator, Crew, Genre, Keyword } from "@app-types/entity";

const routeApi = getRouteApi("/$mediaType/$id");

const MovieDetailPage = () => {
  const { mediaType, id } = routeApi.useParams();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [playingType, setPlayingType] = useState<"movie" | "tv">("movie");

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetail", mediaType, id],
    queryFn: async () => getDetails(mediaType as MediaType, Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (isError || !movie)
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" color="error">
          Media not found!
        </Typography>
      </Box>
    );

  const data = movie.data; // Alias cho gọn
  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG_URL;
  const PLACEHOLDER_IMG = "https://placehold.co/200x300?text=No+Image";

  // Logic hiển thị ảnh
  const posterImg = data.poster_path ? `${imgBaseUrl}${data.poster_path}` : PLACEHOLDER_IMG;
  const bgImgUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : PLACEHOLDER_IMG;

  const title = data.title || data.name;
  const originalDate = data.release_date || data.first_air_date;
  const year = originalDate ? new Date(originalDate).getFullYear() : "";
  const date = formatDate(originalDate);
  const genres = data.genres?.map((item: Genre) => item.name).join(", ");
  const runtime = data.runtime ? formatRuntime(data.runtime) : "";

  const score = Math.round(data.vote_average * 10);
  const scoreColor = score >= 70 ? "#21d07a" : score >= 40 ? "#d2d531" : "#db2360";

  const featuredCrew =
    data.credits?.crew
      ?.filter((person: Crew) => ["Director", "Screenplay", "Writer", "Story"].includes(person.job))
      .slice(0, 6) || [];
  const creators = data.created_by || [];
  const castList = data.credits?.cast?.slice(0, 9) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const handlePlayTrailer = (id: number, type: "movie" | "tv") => {
    setPlayingId(id);
    setPlayingType(type);
  };

  const handleFeatureNotReady = () => {
    toast.info("This feature will be updated soon!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", paddingBottom: "50px" }}>
      <HeroDetailsWrapper bgimg={bgImgUrl}>
        <HeroDetailsContainer>
          {/* Poster Img (Left) */}
          <PosterWrapper>
            <PosterImg src={posterImg} alt={title} />
          </PosterWrapper>

          {/* Content (Right) */}
          <DetailsContentWrapper>
            {/* 1. Title & Subtitle */}
            <DetailsContentTitle>
              <TitleText variant="h4">
                {title} <span>({year})</span>
              </TitleText>

              <SubTitleText>
                <Box
                  sx={{
                    border: "1px solid rgba(255,255,255,0.6)",
                    px: "4px",
                    borderRadius: "2px",
                    lineHeight: 1,
                  }}
                >
                  PG-13
                </Box>
                <Typography>{date}</Typography>
                <span className="dot"></span>
                <Typography>{genres}</Typography>
                <span className="dot"></span>
                <Typography>{runtime}</Typography>
              </SubTitleText>
            </DetailsContentTitle>

            {/* 2. Rating & Actions */}
            <DetailsActionsWrapper>
              {/* Vòng tròn điểm số */}
              <Stack direction="row" alignItems="center" spacing={1} mr={2}>
                <ScoreCircleWrapper>
                  <CircularProgress
                    variant="determinate"
                    value={score}
                    size={50}
                    thickness={4}
                    sx={{ color: scoreColor }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      component="div"
                      sx={{ color: "#fff", fontSize: "0.9rem" }}
                    >
                      {score}
                      <span style={{ fontSize: "0.6em" }}>%</span>
                    </Typography>
                  </Box>
                </ScoreCircleWrapper>
                <Typography
                  fontWeight="bold"
                  sx={{ width: "40px", lineHeight: 1.2, fontSize: "0.9rem" }}
                >
                  User Score
                </Typography>
              </Stack>

              {/* Các nút hành động */}
              <Tooltip title="Add to list">
                <ActionButton onClick={handleFeatureNotReady}>
                  <ListIcon />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Mark as favorite">
                <ActionButton onClick={handleFeatureNotReady}>
                  <FavoriteIcon />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Add to watchlist">
                <ActionButton onClick={handleFeatureNotReady}>
                  <BookmarkIcon />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Rate it!">
                <ActionButton onClick={handleFeatureNotReady}>
                  <StarRateIcon />
                </ActionButton>
              </Tooltip>

              {/* Nút Play Trailer */}
              <Box
                onClick={() => handlePlayTrailer(data.id, mediaType as "movie" | "tv")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 2,
                  cursor: "pointer",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                <PlayArrowIcon />
                <Typography fontWeight="bold">Play Trailer</Typography>
              </Box>
              {playingId && (
                <TrailerModal
                  id={playingId}
                  type={playingType}
                  onClose={() => setPlayingId(null)}
                />
              )}
            </DetailsActionsWrapper>

            {/* 3. Tagline */}
            {data.tagline && <TaglineText variant="subtitle1">{data.tagline}</TaglineText>}

            {/* 4. Overview */}
            <DetailsContentOverview>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                {data.overview}
              </Typography>
            </DetailsContentOverview>

            {/* 5. Crew Grid */}
            <CrewGrid>
              {/* Nếu là Movie thì hiện Crew lọc được, TV thì hiện Creator */}
              {mediaType === "movie"
                ? featuredCrew.map((person: Crew) => (
                    <CrewItem key={`${person.id}-${person.job}`}>
                      <CrewName>{person.name}</CrewName>
                      <CrewJob>{person.job}</CrewJob>
                    </CrewItem>
                  ))
                : creators.map((person: Creator) => (
                    <CrewItem key={person.id}>
                      <CrewName>{person.name}</CrewName>
                      <CrewJob>Creator</CrewJob>
                    </CrewItem>
                  ))}
            </CrewGrid>
          </DetailsContentWrapper>
        </HeroDetailsContainer>
      </HeroDetailsWrapper>
      <MainContentContainer>
        {/* CỘT TRÁI: Top Billed Cast */}
        <LeftColumn>
          <SectionTitle>Top Billed Cast</SectionTitle>

          {castList.length > 0 ? (
            <CastScroller>
              {castList.map((actor: Cast) => (
                <CastCard key={actor.id}>
                  <CastImg
                    src={
                      actor.profile_path
                        ? `${imgBaseUrl}${actor.profile_path}`
                        : "https://placehold.co/138x175?text=No+Img"
                    }
                    alt={actor.name}
                  />
                  <CastInfo>
                    <ActorName>{actor.name}</ActorName>
                    <CharacterName>{actor.character}</CharacterName>
                  </CastInfo>
                </CastCard>
              ))}
            </CastScroller>
          ) : (
            <Typography>No cast information available.</Typography>
          )}
        </LeftColumn>

        {/* CỘT PHẢI: Thông tin phụ (Sidebar) */}
        <RightColumn>
          {/* Trạng thái */}
          <Box mb={3}>
            <Typography fontWeight="bold">Status</Typography>
            <Typography>{data.status}</Typography>
          </Box>

          {/* Ngôn ngữ gốc */}
          <Box mb={3}>
            <Typography fontWeight="bold">Original Language</Typography>
            <Typography textTransform="uppercase">{data.original_language}</Typography>
          </Box>

          {/* Chỉ hiện Budget/Revenue nếu là Movie */}
          {mediaType === "movie" && (
            <>
              <Box mb={3}>
                <Typography fontWeight="bold">Budget</Typography>
                <Typography>{data.budget ? formatCurrency(data.budget) : "-"}</Typography>
              </Box>
              <Box mb={3}>
                <Typography fontWeight="bold">Revenue</Typography>
                <Typography>{data.revenue ? formatCurrency(data.revenue) : "-"}</Typography>
              </Box>
            </>
          )}

          {/* Keywords */}
          <Box mb={3}>
            <Typography fontWeight="bold" gutterBottom>
              Keywords
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {(data.keywords?.keywords || data.keywords?.results || []).map((kw: Keyword) => (
                <Box
                  key={kw.id}
                  sx={{
                    backgroundColor: "#e0e0e0",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                >
                  {kw.name}
                </Box>
              ))}
            </Box>
          </Box>
        </RightColumn>
      </MainContentContainer>
    </Box>
  );
};

export default MovieDetailPage;
