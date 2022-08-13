import { ErrorMessage, Field, Form } from 'formik';
import { Button } from '../button';
import styles from './recipeForm.module.scss';
import validator from 'validator';
import defImage from '../../../assets/img/recipeDefImage.jpg';
import { useEffect, useRef } from 'react';
import { Product } from '../../interafces';

interface Ingridient {
  name: string;
  product_id: number;
  quantity: number;
}

interface recipeFormProps {
  isShowing: boolean;
  setIsShowing: Function;
  isSubmitting: boolean;
  submitError: string;
  values: any;
  products: Array<Product>;
  ingridients: Array<Ingridient>;
  setIngridients: Function;
}

export const RecipeForm = ({
  isShowing,
  values,
  isSubmitting,
  setIsShowing,
  submitError,
  products,
  ingridients,
  setIngridients,
}: recipeFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const ingridient = useRef<HTMLSelectElement>(null);

  const addIngridient = () => {
    const prod = products.find((item) =>
      ingridient.current ? item.name === ingridient.current.value : false
    );
    const ing = { name: prod?.name, id: prod?.id, quantity: 1 };

    setIngridients([...ingridients, ing]);
  };

  useEffect(() => {
    formRef.current && formRef.current.scrollTo(0, 0);
  }, [isShowing]);

  const setThumbnail = (thumbnail: string) => {
    return !thumbnail || !validator.isURL(thumbnail) ? defImage : thumbnail;
  };

  const setPhoto = (photo: string) => {
    return !photo || !validator.isURL(photo) ? defImage : photo;
  };

  return (
    <Form ref={formRef} className={styles.form}>
      <div className={styles.field}>
        <select ref={ingridient} className={styles.input} name="ingridients">
          {products.map((item) => {
            return (
              <option className={styles.option} key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <Button type="button" onClick={addIngridient}>
          Add
        </Button>
        <div>
          {ingridients.map((item) => {
            return (
              <div key={item.product_id}>{`${item.name} ${item.quantity}`}</div>
            );
          })}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="thumbnailUrl" className={styles.label}>
          Thumbnail:
          <div className={styles.imageWrapper}>
            <img
              className={styles.imagePreview}
              src={setThumbnail(values.thumbnailUrl)}
              alt="previev"></img>
          </div>
          <Field className={styles.input} type="text" name="thumbnailUrl" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="thumbnailUrl"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="photoUrl" className={styles.label}>
          Photo:
          <div className={styles.imageWrapper}>
            <img
              className={styles.imagePreview}
              src={setPhoto(values.photoUrl)}
              alt="previev"></img>
          </div>
          <Field className={styles.input} type="text" name="photoUrl" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="photoUrl"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name:
          <Field className={styles.input} type="text" name="name" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="name"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="content" className={styles.label}>
          Content:
          <Field
            className={`${styles.textarea} ${styles.input}`}
            value={values.content || ''}
            as="textarea"
            type="text"
            name="content"
          />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="content"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="level" className={styles.label}>
          Level:
          <Field
            className={styles.input}
            type="number"
            name="level"
            as="select">
            <Field className={styles.option} value={1} as="option">
              1
            </Field>
            <Field className={styles.option} value={2} as="option">
              2
            </Field>
            <Field className={styles.option} value={3} as="option">
              3
            </Field>
            <Field className={styles.option} value={4} as="option">
              4
            </Field>
            <Field className={styles.option} value={5} as="option">
              5
            </Field>
          </Field>
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="level"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="price" className={styles.label}>
          Price:
          <Field className={styles.input} type="text" name="price" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="price"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="cookingTime" className={styles.label}>
          Cooking time:
          <Field className={styles.input} type="text" name="cookingTime" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="cookingTime"
          component="div"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="videoLink" className={styles.label}>
          Video link:
          <Field className={styles.input} type="text" name="videoLink" />
        </label>
        <ErrorMessage
          className={styles.errorMessage}
          name="videoLink"
          component="div"
        />
      </div>
      <div className={styles.buttWrapper}>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => setIsShowing(false)}>
          Cancel
        </Button>
        <div className={styles.submitError}>{submitError}</div>
      </div>
    </Form>
  );
};
