import React, { FC } from "react";

import styles from "./NewsList.module.scss";
import { Container } from "../container/Container";
import { News } from "../news/News";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchNews } from "../../store/actions/news";
import { cleanNews } from "../../store/slices/newsSlice";

interface NewsListProps {
  newsId: number[];
}

export const NewsList: FC<NewsListProps> = ({ newsId }) => {
  const dispatch = useAppDispatch();

  const onRefreshList = () => {
    dispatch(cleanNews());
    dispatch(fetchNews());
  };
  return (
    <div className={styles.newsList}>
      <Container>
        <h1 className={styles.newsList__title}>100 latest news</h1>
        <ul className={styles.newsList__list}>
          {newsId &&
            newsId.map((storyId) => <News storyId={storyId} key={storyId} />)}
        </ul>
        <button
          className={styles.newsList__refresh}
          type="button"
          onClick={onRefreshList}
        >
          Refresh list
        </button>
      </Container>
    </div>
  );
};
