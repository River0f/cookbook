import styles from './recipes.module.scss';
import { useEffect, useState } from 'react';
import { RecipesItem } from '../recipeItem';
import { Spinner } from '../ui/loadingSpinner';
import { fetchRecipes } from '../../api/recipesApi';
import { Recipe } from '../interafces';
import { RecipeCreateForm } from '../recipeCreateForm';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { OptionSort } from '../ui/optionSort/optionSort';

const pageSize: number = 12;

export const Recipes = () => {
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  // For infinite scroll
  const [hasMore, setHasMore] = useState(true);
  const [dataLength, setDataLength] = useState(0);

  const sortRecipes = (sortBy: string, sortOrder: string) => {
    setRecipes(sortBy, sortOrder);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const setRecipes = (sortBy: string = 'name', sortOrder: string = 'asc') => {
    setIsFetching(true);
    setCurrentPage(1);
    fetchRecipes(1, pageSize, sortBy, sortOrder).then((recipes) => {
      setRecipesList(recipes.data);
      setPageCount(recipes.pagination.total);
      setHasMore(true);
      setIsFetching(false);
    });
  };

  const addRecipes = () => {
    if (currentPage === pageCount) {
      setHasMore(false);
      return;
    }
    setDataLength(dataLength + pageCount);
    setHasMore(true);
    fetchRecipes(currentPage + 1, pageSize, sortBy, sortOrder).then(
      (recipes) => {
        const updRecipesList = new Map();
        [...recipesList, ...recipes.data].forEach((item, index) => {
          updRecipesList.set(item.id, item);
        });
        setRecipesList(Array.from(updRecipesList.values()));
        setCurrentPage(currentPage + 1);
        setPageCount(recipes.pagination.total);
      }
    );
  };

  useEffect(() => {
    setRecipes();
    window.scrollTo(0, 0);
  }, []);

  const recipesElementList = recipesList.map((item) => {
    return (
      <RecipesItem
        key={item.id}
        id={item.id}
        recipesList={recipesList}
        setRecipesList={setRecipesList}
      />
    );
  });

  return isFetching ? (
    <div className={styles.loaderWrapper}>
      <Spinner />
    </div>
  ) : (
    <>
      <div className={styles.menu}>
        <OptionSort
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortRecipes={sortRecipes}
        />
        <div className={styles.bar}>
          <div className={styles.createForm}>
            <Button onClick={() => setIsCreating(true)}>Create Post</Button>
            <Modal visible={isCreating}>
              <RecipeCreateForm
                setRecipes={setRecipes}
                setIsShowing={setIsCreating}
                isShowing={isCreating}
              />
            </Modal>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <InfiniteScroll
          dataLength={dataLength}
          next={addRecipes}
          hasMore={hasMore}
          className={styles.infScroll}
          loader={<Spinner />}>
          {recipesElementList}
        </InfiniteScroll>
      </div>
    </>
  );
};
