import { useParams } from "@tanstack/react-router";
import CatalogTemplate from "@components/common/CatalogTemplate";
import { catalogRoute } from "@router/router";
import { formatSlugTitle, formatSlugToApi } from "@utils/formatters";

const CatalogPage = () => {
  const { mediaType, category } = useParams({ from: catalogRoute.id });
  const apiType = mediaType === "tv" ? "tv" : "movie";
  const apiCategory = formatSlugToApi(category);
  const suffix = apiType === "movie" ? "Movies" : "TV Shows";
  const pageTitle = `${formatSlugTitle(category)} ${suffix}`;

  return <CatalogTemplate catalogName={pageTitle} type={apiType} category={apiCategory} />;
};

export default CatalogPage;
