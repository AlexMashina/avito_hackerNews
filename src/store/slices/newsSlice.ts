import { INews } from "./../../models/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsSlice {
  newsList: INews[];
}

const initialState: NewsSlice = {
  newsList: [],
};

const newsSlice = createSlice({
  name: "newsReducer",
  initialState,
  reducers: {
    setNews(state, { payload }: PayloadAction<INews>) {
      state.newsList = [...state.newsList, payload].sort(
        (a, b) => b.time - a.time
      );
    },
    cleanNews(state) {
      state.newsList = [];
    },
  },
});

export const { setNews, cleanNews } = newsSlice.actions;

export default newsSlice.reducer;
