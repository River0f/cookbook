import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './comments.module.scss';
import { validateComment } from './../../utils/formsValidations';
import { Button } from '../ui/button';
import { useContext, useState } from 'react';
import { Comment } from '../interafces';
import { v4 as uuidv4 } from 'uuid';
import { postComment } from '../../api/recipesApi';
import { CommentsItem } from '../commentsItem';
import { AuthContext } from '../app';
import { LoginInvite } from '../ui/loginInvite';

interface CommentsProps {
  commentsList: Comment[];
  id: number;
}

export const Comments = ({ commentsList, id }: CommentsProps) => {
  const [comments, setComments] = useState(commentsList);

  const commentsListElement = comments.map((item) => (
    <CommentsItem key={uuidv4()} author={item.author} body={item.body} />
  ));

  const author = localStorage.getItem('token');
  const { authenticated } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      {authenticated ? (
        <Formik
          initialValues={{ body: '' }}
          onSubmit={(values, { setSubmitting }) => {
            const email = localStorage.getItem('token') || '';
            const comment: Comment = {
              author: email,
              body: values.body,
            };
            setSubmitting(true);
            postComment(id, comment).then((response) => {
              console.log(response);
              setComments([...comments, comment]);
              setSubmitting(false);
            });
          }}
          validate={validateComment}>
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.author}>{author}</div>
              <div className={styles.fieldWrapper}>
                <Field
                  className={`${styles.field} ${styles.textarea}`}
                  type="textarea"
                  name="body"
                  as="textarea"
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="body"
                  component="div"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Send
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <LoginInvite />
      )}
      <div className={styles.commentsList}>{commentsListElement}</div>
    </div>
  );
};
