import { setCookie } from './setCookies';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
