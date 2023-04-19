import { FC, ReactNode } from 'react';

import { useIntl } from '../hooks';

interface IntlTextProps {
  path: string;
  values?: Record<string, string | number | boolean>;
  children?: (message: string) => ReactNode;
}

export const IntlText: FC<IntlTextProps> = ({ path, values, children }) => {
  const intl = useIntl();

  if (children && typeof children === 'function') {
    return <span>{children(intl.translateMessage(path, values))}</span>;
  }

  return <span>{intl.translateMessage(path, values)}</span>;
};
