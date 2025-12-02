// 1. Hàm tính màu Hex cho Rating
export const getRatingHexColor = (vote: number): string => {
  if (vote >= 7) return "#21d07a";
  if (vote >= 4) return "#d2d531";
  return "#db2360";
};

// 2. Hàm format ngày tháng
export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

// 3.Helper: Chuyển "top-rated" -> "Top Rated" (cho Layout)
export const formatSlugTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// 4. Helper: Chuyển "top-rated" -> "top_rated" (cho API)
export const formatSlugToApi = (slug: string) => {
  return slug.replace(/-/g, "_");
};
