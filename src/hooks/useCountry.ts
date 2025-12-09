import { getCountries } from "@api/moviesApi";
import { useQuery } from "@tanstack/react-query";

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export const useCountry = () => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await getCountries();
      return res.data.sort((a: Country, b: Country) =>
        a.english_name.localeCompare(b.english_name),
      );
    },
    staleTime: Infinity,
  });
  return query;
};
