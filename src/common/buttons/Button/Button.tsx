import { FC, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, isLoading = false }) => {
  return (
    <button className={styles.button}>
      {!isLoading && children}
      {isLoading && <div className={styles.dotFlashing} />}
    </button>
  );
};
