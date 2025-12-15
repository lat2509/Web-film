import { Box, Typography, Pagination, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import thêm hook theme
import { getRouteApi, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSearchResults } from "@hooks/useSearchResults";
import SearchSidebar from "@components/search/SearchSidebar";
import SearchResultItem from "@components/search/SearchResultItem";
import type { SearchResultsFilm } from "@app-types/entity";
import Loading from "@components/common/Loading";

const SearchResultsPage = () => {
  const [type, setType] = useState<string>("movie");
  const routeApi = getRouteApi("/search");
  const { query, page } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  // --- 1. SETUP RESPONSIVE ---
  const theme = useTheme();
  // Kiểm tra nếu màn hình nhỏ hơn 'md' (900px) thì là mobile/tablet
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // --- 2. GỌI CUSTOM HOOK ---
  const { searchResults, stats, totalPages, isLoading, isError } = useSearchResults(
    query,
    type,
    page || 1,
  );

  // --- 3. EVENT HANDLERS ---
  const handlePageChange = (_: unknown, value: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate({ search: (prev) => ({ ...prev, page: value }) });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    navigate({ search: (prev) => ({ ...prev, page: 1 }) });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Typography color="error" align="center" mt={5}>
        Data not found.
      </Typography>
    );

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        width="100%"
        maxWidth="1400px"
        mt={2}
        // --- RESPONSIVE LAYOUT ---
        // Mobile: Xếp dọc (column), Desktop: Xếp ngang (row)
        flexDirection={{ xs: "column", md: "row" }}
        // Mobile: Padding nhỏ (2=16px), Desktop: Padding lớn (4=32px)
        px={{ xs: 2, md: 4 }}
        py={{ xs: 3, md: 5 }}
        // Mobile: Gap nhỏ, Desktop: Gap lớn
        gap={{ xs: 2, md: 4 }}
      >
        {/* SIDEBAR TRÁI */}
        {/* Trên mobile nó sẽ nằm trên cùng và full width */}
        <Box width={{ xs: "100%", md: "auto" }}>
          <SearchSidebar stats={stats} selectedType={type} onTypeChange={handleTypeChange} />
        </Box>

        {/* NỘI DUNG PHẢI */}
        <Box flex={1}>
          {searchResults.length > 0 ? (
            <>
              {/* Danh sách kết quả */}
              <Box>
                {searchResults.map((item: SearchResultsFilm) => (
                  <Link
                    // Lưu ý: Key phải đặt ở thẻ bao ngoài cùng (Link)
                    key={item.id}
                    to="/$mediaType/$id"
                    params={{ mediaType: type as "movie" | "tv", id: String(item.id) }}
                    // Bỏ gạch chân mặc định của thẻ a/Link
                    style={{ textDecoration: "none" }}
                  >
                    <SearchResultItem item={item} type={type} />
                  </Link>
                ))}
              </Box>

              {/* Phân trang */}
              <Stack spacing={2} alignItems="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page || 1}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  // Mobile dùng size 'medium' cho đỡ chật, Desktop dùng 'large'
                  size={isMobile ? "medium" : "large"}
                  // Ẩn bớt các nút số nếu màn hình quá nhỏ (dưới 600px)
                  siblingCount={isMobile ? 0 : 1}
                />
              </Stack>
            </>
          ) : (
            <Typography variant="h6" mt={2} textAlign={{ xs: "center", md: "left" }}>
              No results found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultsPage;
