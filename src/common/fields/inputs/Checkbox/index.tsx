import { FC } from 'react';

import { InputProps } from '../inputs';

import styles from './Checkbox.module.scss';

export const Checkbox: FC<InputProps> = ({ label, ...props }) => (
  // <div>
  //   <label className={styles.customCheckbox}>
  //     <input
  //       className={styles.checkbox}
  //       type="checkbox"
  //     />
  //     <span>{label}</span>
  //   </label>
  // </div>
  <div>
    <input
      className={styles.customCheckbox}
      type="checkbox"
      id="checkbox"
      checked={props.checked}
      {...props}
    />
    <label htmlFor="checkbox">{label}</label>
  </div>
);
