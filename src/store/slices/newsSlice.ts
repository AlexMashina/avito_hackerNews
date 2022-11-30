import { INews } from "./../../models/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsSlice {
  newsListId: number[];
}

const initialState: NewsSlice = {
  newsListId: [],
};

const newsSlice = createSlice({
  name: "newsReducer",
  initialState,
  reducers: {
    setNewsId(state, { payload }: PayloadAction<number[]>) {
      state.newsListId = payload;
    },
    cleanNews(state) {
      state.newsListId = [];
    },
  },
});

export const { setNewsId, cleanNews } = newsSlice.actions;

export default newsSlice.reducer;
