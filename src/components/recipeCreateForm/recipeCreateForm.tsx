import styles from './recipeCreateForm.module.scss';
import { postRecipe } from '../../api/recipesApi';
import { validateRecepyForm } from '../../utils/formsValidations';
import { useContext, useEffect, useState } from 'react';
import { RecipeForm } from '../ui/recipeForm';
import { Formik } from 'formik';
import { AuthContext } from '../app';
import { LoginInvite } from '../ui/loginInvite';
import { Button } from '../ui/button';
import { fetchProducts } from '../../api/productsApi';
import { Product } from '../interafces';

interface RecipeCreateFormProps {
  setRecipes: Function;
  setIsShowing: Function;
  isShowing: boolean;
}

interface Ingridient {
  product_id: number;
  quantity: number;
  name: string;
}

export const RecipeCreateForm = ({
  setRecipes,
  setIsShowing,
  isShowing,
}: RecipeCreateFormProps) => {
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
          initialValues={{
            name: '',
            content: '',
            level: 1,
            cookingTime: 15,
            price: '',
            videoLink: '',
            thumbnailUrl: '',
            photoUrl: '',
            ingredients: [],
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
            postRecipe(data)
              .then((response) => {
                if (!response.ok) {
                  const error = `Error: ${response.status}. ${response.statusText}`;
                  return Promise.reject(error);
                }
                setRecipes();
                setSubmitting(false);
                setIsShowing(false);
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
