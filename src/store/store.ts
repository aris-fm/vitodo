import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./todosApi";

const reducers = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
