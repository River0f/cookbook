import styles from './paginationBar.module.scss';

interface Bar {
  onPagination: any;
  currentPage: number;
  pageCount: number;
}

const isPreviousDisabled = (currPage: number): boolean => {
  if (currPage <= 1) {
    return true;
  } else return false;
};

const isNextDisabled = (currPage: number, pageNumber: number): boolean => {
  if (currPage >= pageNumber) {
    return true;
  } else return false;
};

export const PaginationBar = ({
  onPagination,
  currentPage,
  pageCount,
}: Bar) => {
  const previousDisable = isPreviousDisabled(currentPage);
  const nextDisable = isNextDisabled(currentPage, pageCount);

  return (
    <div className={styles.wrapper}>
      <button
        disabled={previousDisable}
        className={styles.button}
        onClick={() => onPagination(currentPage - 1)}>
        Previous
      </button>
      <button
        disabled={nextDisable}
        className={styles.button}
        onClick={() => onPagination(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};
