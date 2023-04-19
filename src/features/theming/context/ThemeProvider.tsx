import { FC, ReactNode, useState } from 'react';
import { setCookie } from '@utils';

import darkTheme from '../../../styles/themes/dark.module.scss';
import lightTheme from '../../../styles/themes/light.module.scss';

import { Theme, ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  console.log(theme);

  const setTheme = (newTheme: Theme) => {
    setCookie('doggee-theme', newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>{children}</div>
    </ThemeContext.Provider>
  );
};
