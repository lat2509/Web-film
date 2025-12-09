import { Box, CircularProgress, Typography, Pagination, Stack } from "@mui/material";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { useSearchResults } from "@hooks/useSearchResults";
import SearchSidebar from "@components/common/SearchSidebar";
import SearchResultItem from "@components/common/SearchResultItem";

const SearchResultsPage = () => {
  const [type, setType] = useState<string>("movie");
  const routeApi = getRouteApi("/search");
  const { query, page } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  // 1. Gọi custom hook
  const { searchResults, stats, totalPages, isLoading, isError } = useSearchResults(
    query,
    type,
    page || 1,
  );

  // 2. Các hàm xử lý sự kiện
  const handlePageChange = (_: unknown, value: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate({ search: (prev) => ({ ...prev, page: value }) });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    navigate({ search: (prev) => ({ ...prev, page: 1 }) });
  };

  // 3. Render Loading/Error
  if (isLoading)
    return (
      <Box p={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Typography color="error" align="center" mt={5}>
        Data not found.
      </Typography>
    );

  // 4. Render Giao diện chính
  return (
    <Box display="flex" justifyContent="center">
      <Box display="flex" px={4} py={5} width="100%" maxWidth="1400px" gap={4} mt={2}>
        {/* SIDEBAR TRÁI */}
        <SearchSidebar stats={stats} selectedType={type} onTypeChange={handleTypeChange} />

        {/* NỘI DUNG PHẢI */}
        <Box flex={1}>
          {searchResults.length > 0 ? (
            <>
              {/* Danh sách kết quả */}
              <Box>
                {searchResults.map((item: any) => (
                  <SearchResultItem key={item.id} item={item} type={type} />
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
                  size="large"
                />
              </Stack>
            </>
          ) : (
            <Typography variant="h6" mt={2}>
              No results found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultsPage;
