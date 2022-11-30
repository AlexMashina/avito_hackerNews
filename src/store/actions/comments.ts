import { IComment } from "../../models/comment";
import { setComments, setCommentsLoading } from "../slices/activeStorySlice";

export function fetchComments(comments: number[]) {
  return async (dispatch: any) => {
    try {
      const commentsList: IComment[] = [];
      dispatch(setCommentsLoading());
      for (let i = 0; i < comments.length; i++) {
        const comment: IComment = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${comments[i]}.json?print=pretty`
        )
          .then((res) => res.json())
          .then((comment) => comment);
        commentsList.push(comment);
      }
      dispatch(setComments(commentsList));
      dispatch(setCommentsLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

export async function calculateTotalComments(comments: number[]) {
  let totalComments = comments.length;

  if (comments.length === 0) {
    return 0;
  }

  for (let i = 0; i < comments.length; i++) {
    await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${comments[i]}.json?print=pretty`
    )
      .then((resp) => resp.json())
      // eslint-disable-next-line no-loop-func
      .then((data) => {
        if (data.kids) {
          totalComments += 1;
          calculateTotalComments(data.kids);
        }
      });
  }

  return totalComments;
}
