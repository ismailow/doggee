import { AcceptLocales, DEFAULT_LOCALE } from './getLocale';

export const getMessages = async (locale: AcceptLocales) => {
  let messages;
  try {
    messages = await import(`../../../static/locales/${locale}.json`);
    return messages.default;
  } catch {
    messages = await import(`../../../static/locales/${DEFAULT_LOCALE}.json`);
    return messages.default;
  }
  // const messages = await import(`../../../static/locales/${locale}.json`);
  // return messages.default;
};
