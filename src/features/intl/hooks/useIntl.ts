import { useContext } from 'react';

import { IntlContext } from '../context';

export const useIntl = () => {
  const intl = useContext(IntlContext);

  const translateMessage = (path: string, values?: Record<string, string | number | boolean>) => {
    if (!intl.messages[path]) {
      return path;
    }

    if (!values) {
      return intl.messages[path];
    }

    const valuesKeys = Object.keys(values);
    let translate = intl.messages[path];
    valuesKeys.forEach((key) => {
      translate = translate.replace(`${key}`, String(values[key]));
    });

    return translate;
  };

  return { ...intl, translateMessage };
};
