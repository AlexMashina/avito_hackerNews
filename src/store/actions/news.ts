import { setNews } from "../slices/newsSlice";
import { INews } from "../../models/news";

export function fetchNews() {
  return async (dispatch: any) => {
    try {
      const newsListId: INews[] = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
      )
        .then((res) => res.json())
        .then((data) => data);
      for (let i = 1; i <= 100; i++) {
        const newsStory: INews = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${newsListId[i]}.json?print=pretty`
        )
          .then((res) => res.json())
          .then((data) => data);
        dispatch(setNews(newsStory));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
