import { IComment } from "../../models/comment";
import { setComments } from "../slices/activeStorySlice";

export function fetchComments(comments: number[]) {
  return async (dispatch: any) => {
    try {
      const commentsList: IComment[] = [];
      for (let i = 0; i < comments.length; i++) {
        const comment: IComment = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${comments[i]}.json?print=pretty`
        )
          .then((res) => res.json())
          .then((comment) => comment);
        commentsList.push(comment);
      }
      dispatch(setComments(commentsList));
    } catch (error) {
      console.log(error);
    }
  };
}
