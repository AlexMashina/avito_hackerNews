import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activeStorySlice from "./slices/activeStorySlice";

import newsSlice from "./slices/newsSlice";

const rootReducer = combineReducers({
  news: newsSlice,
  activeStory: activeStorySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
