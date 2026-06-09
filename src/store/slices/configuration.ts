import { movieApi } from "./apiSlice";
import { getLocalConfiguration } from "src/lib/localMovieService";

export const extendedApi = movieApi.injectEndpoints({
  endpoints: (build) => ({
    getConfiguration: build.query<ReturnType<typeof getLocalConfiguration>, void>({
      queryFn: async () => ({ data: getLocalConfiguration() }),
    }),
  }),
});

export const { useGetConfigurationQuery } = extendedApi;
