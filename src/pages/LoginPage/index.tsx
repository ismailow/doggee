import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Input, PasswordInput, Checkbox } from '@common/fields';
import { Button } from '@common/buttons';
import { Link } from 'react-router-dom';
import { useMutation, useQueryLazy } from '@utils';

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

interface User {
  username: string;
  password: string;
  id: string;
}

export const LoginPage: FC = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '', notMyComp: false });
  const [formErrors, setFormErrors] = useState<FofmError>({ username: null, password: null });
  const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
    'http://localhost:3001/auth',
    'post'
  );
  const { query } = useQueryLazy('http://localhost:3001/users');
  // console.log(data);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <span>DOGGEE</span>
        </div>
        <form
          className={styles.formContainer}
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const response = await authMutation(formValues);
            // console.log(response.data);
            const response = await query();
            console.log(response);
          }}
        >
          <div className={styles.inputContainer}>
            <Input
              label="username"
              value={formValues.username}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const inputError = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: inputError });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
              disabled={authLoading}
            />
          </div>
          <div className={styles.inputContainer}>
            <PasswordInput
              label="password"
              value={formValues.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const inputError = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: inputError });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
              disabled={authLoading}
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
            <Button
              isLoading={authLoading}
              type="submit"
              disabled={authLoading}
            >
              Sign In
            </Button>
          </div>
        </form>
        <div className={styles.signUpContainer}>
          <Link to="/registration">Create new account</Link>
        </div>
      </div>
    </div>
  );
};
