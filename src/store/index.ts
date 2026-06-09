import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./slices/apiSlice";
import discoverReducer from "./slices/discover";

const store = configureStore({
  reducer: {
    discover: discoverReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
