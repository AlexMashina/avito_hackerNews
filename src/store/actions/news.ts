import { setNewsId } from "../slices/newsSlice";

export function fetchNews() {
  return async (dispatch: any) => {
    try {
      await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
      )
        .then((res) => res.json())
        .then((data) => dispatch(setNewsId(data.slice(1, 101))));
    } catch (error) {
      console.log(error);
    }
  };
}
