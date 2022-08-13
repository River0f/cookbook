import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { fetchRecipesById } from '../../api/recipesApi';
import { RecipeDeleteForm } from '../recipeDeleteForm';
import { RecipeById, Recipe } from '../interafces';
import validator from 'validator';
import styles from './recipeItem.module.scss';
import defImage from '../../assets/img/recipeDefImage.jpg';
import { ReactComponent as EditIcon } from '../../assets/svg/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/svg/deleteIcon.svg';
import { ReactComponent as RateIcon } from '../../assets/svg//rate.svg';
import { RecipeEditForm } from '../recipeEditForm';
import { Spinner } from '../ui/loadingSpinner';

interface RecipeItemProps {
  id: number;
  recipesList: Recipe[];
  setRecipesList: Function;
}

export const RecipesItem = ({
  id,
  recipesList,
  setRecipesList,
}: RecipeItemProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [recipeItemData, setRecipeItemData] = useState<RecipeById>({
    id,
    name: '',
    content: '',
    level: 1,
    video_link: '',
    cooking_time: 0,
    price: 0,
    photo_url: '',
    avg_rate: 0,
    rates_count: 0,
    thumbnail_url: '',
    comments: [],
    ingredients: [],
  });

  const thumbnail =
    !recipeItemData.thumbnail_url ||
    !validator.isURL(recipeItemData.thumbnail_url)
      ? defImage
      : recipeItemData.thumbnail_url;

  const onDelete = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    setIsFetching(true);
    fetchRecipesById(id).then((respose) => {
      setRecipeItemData(respose);
      setIsFetching(false);
    });
  }, []);

  const onChange = () => {
    setIsChanging(true);
    fetchRecipesById(id).then((respose) => {
      setRecipeItemData(respose);
    });
  };

  return isFetching ? (
    <div className={`${styles.wrapper} ${styles.fetchingWrapper}`}>
      <div className={styles.loaderWrapper}>
        <Spinner />
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <Button onClick={onDelete}>
          <DeleteIcon />
        </Button>
        <Button onClick={onChange}>
          <EditIcon />
        </Button>
      </div>
      <img
        className={styles.thumbnail}
        src={thumbnail}
        alt={recipeItemData.name}></img>
      <div className={styles.main}>
        <NavLink className={styles.link} to={`${id}`}>
          <h1 className={styles.name}>{recipeItemData.name}</h1>
        </NavLink>
        <p className={styles.content}>{recipeItemData.content}</p>
        <div className={styles.rate}>
          <span>Cooking time: {recipeItemData.cooking_time}</span>
          <RateIcon style={{ width: '20px' }} />
          <span>{recipeItemData.rates_count}/5</span>
        </div>
      </div>
      <Modal visible={isDeleting}>
        <RecipeDeleteForm
          id={id}
          setIsShowing={setIsDeleting}
          recipesList={recipesList}
          setRecipesList={setRecipesList}
        />
      </Modal>
      <Modal visible={isChanging}>
        <RecipeEditForm
          id={id}
          recipeItemData={recipeItemData}
          setRecipeItemData={setRecipeItemData}
          setIsShowing={setIsChanging}
          isShowing={isChanging}
        />
      </Modal>
    </div>
  );
};
