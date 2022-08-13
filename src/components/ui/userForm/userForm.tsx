import { ErrorMessage, Field, Form } from 'formik';
import { Button } from '../button';
import styles from './userForm.module.scss';

interface UserFormProps {
  isSubmitting: boolean;
  submitError: string;
}

export const UserForm = ({ isSubmitting, submitError }: UserFormProps) => {
  return (
    <Form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email:
          <Field className={styles.input} type="email" name="email" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="email"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password:
          <Field
            className={`${styles.textarea} ${styles.input}`}
            type="password"
            name="password"
          />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="password"
          component="div"
        />
      </div>
      <div className={styles.buttWrapper}>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <div className={styles.submitError}>{submitError}</div>
      </div>
    </Form>
  );
};
