import styles from './button.module.scss';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export const Button = ({ onClick, children, type, disabled }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};
