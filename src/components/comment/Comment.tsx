import React, { FC, useState } from "react";

import { IComment } from "../../models/comment";
import styles from "./Comment.module.scss";
import ReactHtmlParser from "react-html-parser";

interface CommentProps {
  comment: IComment;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const [isButtonUnswers, setButtonAnswers] = useState(true);
  const [commentsChild, setCommentsChild] = useState([]);

  const onShowAnswers = async (kids: number[] | undefined) => {
    setButtonAnswers(false);
    const commentsChilds: any = [];
    if (kids !== undefined) {
      for (let i = 0; i < kids.length; i++) {
        const comment: IComment = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${kids[i]}.json?print=pretty`
        )
          .then((res) => res.json())
          .then((comment) => comment);
        commentsChilds.push(comment);
      }
    }
    setCommentsChild(commentsChilds);
  };

  return (
    <li className={styles.comment} key={comment.id}>
      <p className={styles.comment__head}>
        <b>Autor:</b>{" "}
        <span className={styles.comment__title}>{comment.by}</span> <b>date:</b>{" "}
        <span className={styles.comment__title}>
          {new Date(comment.time * 1000).toLocaleString("ru")}
        </span>
      </p>
      <div className={styles.comment__text}>
        {ReactHtmlParser(comment.text)}
      </div>
      {comment.kids && isButtonUnswers && (
        <button
          className={styles.comment__answers}
          onClick={() => onShowAnswers(comment.kids)}
        >
          Show answers
        </button>
      )}
      {commentsChild.length > 0 && (
        <ul className={styles.comment__child}>
          {commentsChild.map((comment) => (
            <Comment comment={comment} />
          ))}
        </ul>
      )}
    </li>
  );
};
