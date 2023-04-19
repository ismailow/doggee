import { FC, ReactNode, useState } from 'react';

import { IntlContext } from './IntlContext';

interface IntlProviderProps {
  locale: string;
  messages: Record<string, any>;
  children: ReactNode;
}

export const IntlProvider: FC<IntlProviderProps> = ({ locale, messages, children }) => {
  const [intlValues, setIntlValues] = useState({ locale, messages });
  return <IntlContext.Provider value={intlValues}>{children}</IntlContext.Provider>;
};
