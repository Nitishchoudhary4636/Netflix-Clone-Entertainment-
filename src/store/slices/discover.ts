import { movieApi } from "./apiSlice";
import { MEDIA_TYPE, PaginatedMovieResult } from "src/types/Common";
import { MovieDetail } from "src/types/Movie";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getMovieDetail,
  getMoviesByCustomList,
  getMoviesByGenreId,
  getSimilarMovies,
} from "src/lib/localMovieService";

const initialState: Record<string, Record<string, PaginatedMovieResult>> = {};
export const initialItemState: PaginatedMovieResult = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setNextPage: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      state[mediaType][itemKey].page += 1;
    },
    initiateItem: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      if (!state[mediaType]) {
        state[mediaType] = {};
      }
      if (!state[mediaType][itemKey]) {
        state[mediaType][itemKey] = initialItemState;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(
        extendedApi.endpoints.getVideosByMediaTypeAndCustomGenre.matchFulfilled,
        extendedApi.endpoints.getVideosByMediaTypeAndGenreId.matchFulfilled
      ),
      (state, action) => {
        const {
          page,
          results,
          total_pages,
          total_results,
          mediaType,
          itemKey,
        } = action.payload;
        state[mediaType][itemKey].page = page;
        state[mediaType][itemKey].results.push(...results);
        state[mediaType][itemKey].total_pages = total_pages;
        state[mediaType][itemKey].total_results = total_results;
      }
    );
  },
});

export const { setNextPage, initiateItem } = discoverSlice.actions;
export default discoverSlice.reducer;

const extendedApi = movieApi.injectEndpoints({
  endpoints: (build) => ({
    getVideosByMediaTypeAndGenreId: build.query<
      PaginatedMovieResult & {
        mediaType: MEDIA_TYPE;
        itemKey: number | string;
      },
      { mediaType: MEDIA_TYPE; genreId: number; page: number }
    >({
      queryFn: async ({ mediaType, genreId, page }) => {
        const data = getMoviesByGenreId(genreId, page);
        return {
          data: { ...data, mediaType, itemKey: genreId },
        };
      },
    }),
    getVideosByMediaTypeAndCustomGenre: build.query<
      PaginatedMovieResult & {
        mediaType: MEDIA_TYPE;
        itemKey: number | string;
      },
      { mediaType: MEDIA_TYPE; apiString: string; page: number }
    >({
      queryFn: async ({ mediaType, apiString, page }) => ({
        data: {
          ...getMoviesByCustomList(apiString, page),
          mediaType,
          itemKey: apiString,
        },
      }),
    }),
    getAppendedVideos: build.query<
      MovieDetail,
      { mediaType: MEDIA_TYPE; id: number }
    >({
      queryFn: async ({ id }) => {
        const detail = getMovieDetail(id);
        if (!detail) {
          return { error: { status: 404, data: "Movie not found" } };
        }
        return { data: detail };
      },
    }),
    getSimilarVideos: build.query<
      PaginatedMovieResult,
      { mediaType: MEDIA_TYPE; id: number }
    >({
      queryFn: async ({ id }) => ({ data: getSimilarMovies(id) }),
    }),
  }),
});

export const {
  useGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
  useGetAppendedVideosQuery,
  useLazyGetAppendedVideosQuery,
  useGetSimilarVideosQuery,
  useLazyGetSimilarVideosQuery,
} = extendedApi;
