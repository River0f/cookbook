import styles from './recipeEditForm.module.scss';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { putRecipeById } from '../../api/recipesApi';
import { validateRecepyForm } from '../../utils/formsValidations';
import { AuthContext } from '../app';
import { Product, RecipeById } from '../interafces';
import { Button } from '../ui/button';
import { LoginInvite } from '../ui/loginInvite';
import { RecipeForm } from '../ui/recipeForm';
import { fetchProducts } from '../../api/productsApi';

interface RecipeEditFormProps {
  id: number;
  recipeItemData: RecipeById;
  setRecipeItemData: Function;
  setIsShowing: Function;
  isShowing: boolean;
}

interface Ingridient {
  product_id: number;
  quantity: number;
  name: string;
}

export const RecipeEditForm = ({
  id,
  recipeItemData,
  setRecipeItemData,
  setIsShowing,
  isShowing,
}: RecipeEditFormProps) => {
  const [submitError, setSubmitError] = useState('');

  const [products, setProducts] = useState<Array<Product>>([]);
  const [ingridients, setIngridients] = useState<Array<Ingridient>>([]);

  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isShowing && authenticated) {
      fetchProducts().then((response) => {
        setProducts(response.products);
      });
    }
  }, [isShowing]);

  return (
    <>
      {authenticated ? (
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: recipeItemData.name,
            content: recipeItemData.content,
            level: recipeItemData.level,
            cookingTime: recipeItemData.cooking_time,
            price: recipeItemData.price,
            videoLink:
              recipeItemData.video_link === 'unknown'
                ? ''
                : recipeItemData.video_link,
            thumbnailUrl: recipeItemData.thumbnail_url || '',
            photoUrl: recipeItemData.photo_url || '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const data: any = {
              name: values.name,
              content: values.content,
              level: values.level,
              cooking_time: values.cookingTime,
              price: values.price,
              video_link: values.videoLink,
              thumbnail_url: values.thumbnailUrl,
              photo_url: values.photoUrl,
            };
            putRecipeById(id, data)
              .then((response) => {
                if (!response.ok) {
                  const error = `Error: ${response.status}. ${response.statusText}`;
                  return Promise.reject(error);
                }

                setRecipeItemData({
                  ...recipeItemData,
                  ...data,
                });
                setIsShowing(false);
                setSubmitting(false);
              })
              .catch((error) => {
                setSubmitting(false);
                setSubmitError(error);
              });
          }}
          validate={validateRecepyForm}>
          {({ values, isSubmitting }) => (
            <RecipeForm
              values={values}
              isSubmitting={isSubmitting}
              setIsShowing={setIsShowing}
              isShowing={isShowing}
              submitError={submitError}
              ingridients={ingridients}
              setIngridients={setIngridients}
              products={products}
            />
          )}
        </Formik>
      ) : (
        <div className={styles.loginInvite}>
          <LoginInvite />
          <Button type="button" onClick={() => setIsShowing(false)}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};
