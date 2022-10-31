import React, { FC, memo } from "react";
import { Link } from "react-router-dom";

import styles from "./News.module.scss";
import { INews } from "../../models/news";
import { useAppDispatch } from "../../hooks/hooks";
import { setActiveStory } from "../../store/slices/activeStorySlice";

interface NewsProps {
  story: INews;
}

export const News: FC<NewsProps> = memo(({ story }) => {
  const dispatch = useAppDispatch();

  const timeCreatedStory = new Date(story.time * 1000).toLocaleString("ru");

  const onStory = () => {
    dispatch(setActiveStory(story));
  };

  if (story?.url) {
    return (
      <li className={styles.news}>
        <a
          className={styles.news__item}
          href={`${story.url}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className={styles["news__item-title"]}>{story.title}</p>
          <p className={styles["news__item-info"]}>
            {`autor: ${story.by} | rating: ${story.score} | date: ${timeCreatedStory}`}
          </p>
        </a>
      </li>
    );
  }
  return (
    <li className={styles.news} onClick={onStory}>
      <Link className={styles.news__item} to={`/${story.id}`}>
        <p className={styles["news__item-title"]}>{story.title}</p>
        <p className={styles["news__item-info"]}>
          {`autor: ${story.by} | rating: ${story.score} | date: ${timeCreatedStory}`}
        </p>
      </Link>
    </li>
  );
});
