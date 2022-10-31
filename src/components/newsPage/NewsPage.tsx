import React, { FC, useEffect, memo } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchComments } from "../../store/actions/comments";
import { Container } from "../container/Container";
import { Comment } from "../comment/Comment";
import styles from "./NewsPage.module.scss";
import { cleanComments } from "../../store/slices/activeStorySlice";

export const NewsPage: FC = memo(() => {
  const story = useAppSelector((state) => state.activeStory.story);
  const comments = useAppSelector((state) => state.activeStory.comments);

  const dispatch = useAppDispatch();
  const timeCreatedStory = new Date(story.time * 1000).toLocaleString("ru");

  const getComments = () => {
    if (story.kids && story.kids.length > 0) {
      dispatch(cleanComments());
      dispatch(fetchComments(story.kids));
    }
  };

  useEffect(() => {
    getComments();
  }, [dispatch]);

  return (
    <div className={styles.story}>
      <Container>
        <h1 className={styles.story__title}>{story.title}</h1>
        <p>
          <b>Autor:</b> {story.by}
        </p>
        <p>
          <b>Publication date:</b> {timeCreatedStory}
        </p>
        <p>
          <b>Total comments:</b> {story?.kids ? story.kids.length : 0}
        </p>
        {story?.text ? (
          <div className={styles.story__text}>
            {ReactHtmlParser(story.text)}
          </div>
        ) : (
          <p>No story text!</p>
        )}
        {story.kids && (
          <div>
            <div className={styles["story__comments-wrapper"]}>
              <p>
                <b>Comments:</b>
                <button
                  className={styles["story__comments-refresh"]}
                  type="button"
                  onClick={() => getComments()}
                >
                  update
                </button>
              </p>
            </div>
            <ul className={styles.story__comments}>
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </ul>
          </div>
        )}
        <Link className={styles.story__link} to="/">
          Back
        </Link>
      </Container>
    </div>
  );
});
