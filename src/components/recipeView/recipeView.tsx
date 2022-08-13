import styles from './recipeView.module.scss';
import { useParams, NavLink } from 'react-router-dom';
import { RecipeById } from '../interafces';
import { useEffect, useState } from 'react';
import { fetchRecipesById } from '../../api/recipesApi';
import defImage from '../../assets/img/recipeDefImage.jpg';
import { Comments } from '../comments';
import Iframe from 'react-iframe';
import { ReactComponent as ReturnIcon } from '../../assets/svg/returnIcon.svg';
import { Button } from '../ui/button';

export const RecipeView = () => {
  const { id: idString } = useParams();
  const id = Number(idString);

  const RecipeById = {
    id: 0,
    name: '',
    content: '',
    level: 1,
    video_link: '',
    cooking_time: 0,
    price: '',
    photo_url: '',
    avg_rate: 0,
    rates_count: 0,
    thumbnail_url: '',
    comments: [],
    ingredients: [],
  };

  const [recipe, setRecipe] = useState<RecipeById>(RecipeById);

  useEffect(() => {
    fetchRecipesById(id).then((recipe) => {
      setRecipe(recipe);
    });
  }, []);

  const {
    name,
    content,
    cooking_time: cookingTime,
    level,
    price,
    video_link: videoLink,
    comments,
    thumbnail_url: thumbnailUrl,
    rates_count: ratesCount,
    avg_rate: avgRate,
  } = recipe;

  // const photo = photoUrl || defImage;
  const thumbnail = thumbnailUrl || defImage;

  return (
    <div className={styles.wrapper}>
      <NavLink className={styles.returnLink} to={'/recipes'}>
        <Button>
          <ReturnIcon />
        </Button>
      </NavLink>
      <div className={styles.infoWrapper}>
        <div className={styles.photoWrapper}>
          <img className={styles.photo} src={thumbnail} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.data}>
            <span>Cooking time: </span>
            {cookingTime} minutes
          </div>
          <div className={styles.data}>
            <span>Difficulty: </span>
            {level}
          </div>
          <div className={styles.data}>
            <span>Price: </span>
            {price}
          </div>
          <div className={styles.data}>
            <span>Rate: </span>
            {ratesCount}
          </div>
          <div className={styles.data}>
            <span>Average rate: </span>
            {avgRate}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.videoWrapper}>
          {videoLink === 'unknown' || (
            <Iframe
              className={styles.video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              url={videoLink}
              allowFullScreen={true}
            />
          )}
        </div>
        {content}
      </div>
      <div className={styles.commentsWrapper}>
        <Comments id={id} commentsList={comments} />
      </div>
    </div>
  );
};
