export const getColorRating = (p: number) => {
  if (p * 10 >= 70) return "border-green-400";
  if (p * 10 >= 40) return "border-yellow-400";
  if (p <= 0) return "border-grey-400";
  return "border-red-500";
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};
