import { useParams } from "@tanstack/react-router";
import CatalogTemplate from "@components/common/CatalogTemplate";
import { catalogRoute } from "@router/router";

const formatTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatCategoryForApi = (slug: string) => {
  return slug.replace(/-/g, "_");
};

const CatalogPage = () => {
  const { mediaType, category } = useParams({ from: catalogRoute.id });

  const apiType = mediaType as "movie" | "tv";

  const apiCategory = formatCategoryForApi(category);

  const pageTitle =
    mediaType === "movie" ? `${formatTitle(category)} Movies` : `${formatTitle(category)} TV Shows`;

  return <CatalogTemplate catalogName={pageTitle} type={apiType} category={apiCategory} />;
};

export default CatalogPage;
