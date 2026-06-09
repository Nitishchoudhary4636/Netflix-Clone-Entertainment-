import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
