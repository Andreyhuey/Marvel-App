import { configureStore } from "@reduxjs/toolkit";

import { eventsApi } from "../services/eventsApi";
import { charactersApi } from "../services/charactersApi";
import { comicsApi } from "../services/comicsApi";

export default configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [comicsApi.reducerPath]: comicsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      eventsApi.middleware,
      charactersApi.middleware,
      comicsApi.middleware
    ),
});
