import styles from './commentsItem.module.scss';

interface CommentsItemProps {
  author: string;
  body: string;
}

export const CommentsItem = ({ author, body }: CommentsItemProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>{author}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
