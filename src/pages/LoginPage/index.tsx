import { FC, useState, ChangeEvent } from 'react';
import { Input, PasswordInput, Checkbox } from '@common/fields';
import { Button } from '@common/buttons';
import { Link } from 'react-router-dom';

import styles from './LoginPage.module.scss';

const validateIsEmpty = (value: string) => {
  if (!value) {
    return 'Filed is required';
  }
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  if (!value) {
    return 'Filed is required';
  }
  return null;
};

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword,
};

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value);
};

interface FofmError {
  username: string | null;
  password: string | null;
}

export const LoginPage: FC = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '', notMyComp: false });
  const [formErrors, setFormErrors] = useState<FofmError>({ username: null, password: null });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <span>DOGGEE</span>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <Input
              label="username"
              value={formValues.username}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={styles.inputContainer}>
            <PasswordInput
              label="password"
              value={formValues.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={formValues.notMyComp}
              label="This is not my device"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.checked;
                setFormValues({ ...formValues, notMyComp: value });
              }}
            />
          </div>
          <div>
            <Button isLoading>Sign In</Button>
          </div>
        </div>
        <div className={styles.signUpContainer}>
          <Link to="/registration">Create new account</Link>
        </div>
      </div>
    </div>
  );
};
