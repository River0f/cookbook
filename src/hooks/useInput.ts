import { ChangeEvent, useState } from 'react';

export const useInput = (
  initValue: string
): [string, (e: ChangeEvent<HTMLInputElement> | string) => void] => {
  const [input, setInput] = useState(initValue);
  const onChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setInput(e);
    } else setInput(e.target.value);
  };
  return [input, onChange];
};
