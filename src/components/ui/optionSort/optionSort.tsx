import { Field, Form, Formik } from 'formik';
import { Button } from '../button';
import styles from './optionSort.module.scss';

interface SortingFormProps {
  sortRecipes: Function;
  sortBy: string;
  sortOrder: string;
}

export const OptionSort = ({
  sortRecipes,
  sortBy,
  sortOrder,
}: SortingFormProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          sortBy,
          sortOrder,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const data: any = {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
          };
          sortRecipes(data.sortBy, data.sortOrder);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form className={styles.menu}>
            <Field className={styles.input} name="sortBy" as="select">
              <option value="name">name</option>
              <option value="cooking_time">cooking time</option>
              <option value="level">level</option>
            </Field>
            <Field className={styles.input} name="sortOrder" as="select">
              <option value="asc">ascending</option>
              <option value="desc">desending</option>
            </Field>
            <Button type="submit" disabled={isSubmitting}>
              Sort
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
