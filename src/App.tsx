import { FC, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegestrationPage, NotFoundPage } from '@pages';

import './App.css';

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
  const [isLogged, setIsLogged] = useState(false);
  return <BrowserRouter>{isLogged ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
};

export default App;
