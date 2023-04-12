import { FC, useRef, useState } from 'react';

import { InputProps } from '../inputs';
import styles from '../inputs.module.scss';

export const Input: FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={`${styles.container} ${isError ? styles.error : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <label
          className={`${styles.formLabel} ${isFocus ? styles.focused : ''}`}
          htmlFor="input"
        >
          {label}
        </label>
        <input
          id="input"
          className={styles.input}
          {...props}
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => !props.value && setIsFocus(false)}
        />
      </div>

      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </>
  );
};
