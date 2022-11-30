import React, { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./News.module.scss";
import { INews } from "../../models/news";
import { useAppDispatch } from "../../hooks/hooks";
import { setActiveStory } from "../../store/slices/activeStorySlice";

interface NewsProps {
  storyId: number;
}

export const News: FC<NewsProps> = memo(({ storyId }) => {
  const [story, setStoryInfo] = useState<INews>({} as INews);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onStory = () => {
    dispatch(setActiveStory(story));
  };

  const fetchStoryById = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
      )
        .then((resp) => resp.json())
        .then((data) => setStoryInfo(data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchStoryById();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (story?.url) {
    return isLoading ? (
      <li className={styles.news}>
        <p>Loading...</p>
      </li>
    ) : (
      <li className={styles.news}>
        <a
          className={styles.news__item}
          href={`${story.url}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className={styles["news__item-title"]}>{story.title}</p>
          <p className={styles["news__item-info"]}>
            {`autor: ${story.by} | rating: ${story.score} | date: ${new Date(
              story.time * 1000
            ).toLocaleString("ru")}`}
          </p>
        </a>
      </li>
    );
  }
  return isLoading ? (
    <li className={styles.news}>
      <p>Loading...</p>
    </li>
  ) : (
    <li className={styles.news} onClick={onStory}>
      <Link className={styles.news__item} to={`/${story.id}`}>
        <p className={styles["news__item-title"]}>{story.title}</p>
        <p className={styles["news__item-info"]}>
          {`autor: ${story.by} | rating: ${story.score} | date: ${new Date(
            story.time * 1000
          ).toLocaleString("ru")}`}
        </p>
      </Link>
    </li>
  );
});
