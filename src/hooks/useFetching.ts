import { useState } from 'react';

export const useFetching = (callback: Function): [boolean, () => void] => {
  const [isFetching, setFetching] = useState(true);
  const fetching = async () => {
    setFetching(true);
    await callback();
    setFetching(false);
  };
  return [isFetching, fetching];
};
