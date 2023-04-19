import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegestrationPage, NotFoundPage } from '@pages';
import { deleteCookie, getCookie } from '@utils/helpers/cookies';
import { getLocale, getMessages } from '@utils/helpers/intl';
import { IntlProvider, Theme, ThemeProvider } from '@features';

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/auth"
        element={<LoginPage />}
      />
      <Route
        path="/registration"
        element={<RegestrationPage />}
      />
      <Route
        path="*"
        element={<Navigate to="/auth" />}
      />
    </Routes>
  );
};

const App: FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({});
  const locale = getLocale();

  useEffect(() => {
    const authCookie = getCookie('doggee-auth-token');
    const dontTrustThisDevice = getCookie('dont-trust-this-device');
    const deviceExpire = dontTrustThisDevice && new Date().getTime() > new Date(dontTrustThisDevice).getTime();

    if (authCookie && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('dont-trust-this-device');
    }

    if (authCookie && !dontTrustThisDevice) {
      setIsAuth(true);
    }

    getMessages(locale).then((data) => {
      setMessages(data);
      setIsLoading(false);
    });
  }, [isAuth, locale]);

  if (isLoading) {
    return null;
  }

  const theme = (getCookie('doggee-theme') || 'light') as Theme;

  console.log(getCookie('doggee-theme'));

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
