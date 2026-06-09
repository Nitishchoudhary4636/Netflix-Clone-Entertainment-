import { Genre } from "src/types/Genre";
import { movieApi } from "./apiSlice";
import { getLocalGenres } from "src/lib/localMovieService";

const extendedApi = movieApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Genre[], string>({
      queryFn: async () => ({ data: getLocalGenres() }),
    }),
  }),
});

export const { useGetGenresQuery, endpoints: genreSliceEndpoints } = extendedApi;
