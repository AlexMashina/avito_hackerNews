import { INews } from "./../../models/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../models/comment";

interface ActiveStorySlice {
  story: INews;
  comments: IComment[];
  isCommentsLoading: boolean;
}

const initialState: ActiveStorySlice = {
  story: {} as INews,
  comments: [],
  isCommentsLoading: false,
};

const activeStorySlice = createSlice({
  name: "newsReducer",
  initialState,
  reducers: {
    setActiveStory(state, { payload }: PayloadAction<INews>) {
      state.story = payload;
    },
    setComments(state, { payload }: PayloadAction<IComment[]>) {
      state.comments = payload.sort((a, b) => b.time - a.time);
    },
    cleanComments(state) {
      state.comments = [];
    },
    setCommentsLoading(state) {
      state.isCommentsLoading = !state.isCommentsLoading;
    },
  },
});

export const {
  setActiveStory,
  setComments,
  cleanComments,
  setCommentsLoading,
} = activeStorySlice.actions;

export default activeStorySlice.reducer;
