import styles from './recipeDeleteForm.module.scss';
import { deleteRecipeById } from '../../api/recipesApi';
import { Button } from '../ui/button';
import { Recipe } from '../interafces';
import { useContext } from 'react';
import { AuthContext } from '../app';
import { LoginInvite } from '../ui/loginInvite';

interface DeleteFormProps {
  setIsShowing: Function;
  setRecipesList: Function;
  id: number;
  recipesList: Recipe[];
}

export const RecipeDeleteForm = ({
  setIsShowing,
  id,
  setRecipesList,
  recipesList,
}: DeleteFormProps) => {
  const onDeleteAccept = (id: number) => {
    deleteRecipeById(id).then((response) => {
      setIsShowing(false);
      setRecipesList(recipesList.filter((recipe) => recipe.id !== id));
    });
  };

  const { authenticated } = useContext(AuthContext);

  return (
    <>
      {authenticated ? (
        <form className={styles.form}>
          <div>Are you sure, you want delete this recipe?</div>
          <div className={styles.buttonsWrapper}>
            <Button type="button" onClick={() => onDeleteAccept(id)}>
              Yes
            </Button>
            <Button type="button" onClick={() => setIsShowing(false)}>
              No
            </Button>
          </div>
        </form>
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
