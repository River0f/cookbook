import { Outlet } from 'react-router-dom';
import { Header } from './header';
import './app.scss';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface authContext {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<authContext>({
  authenticated: false,
  setAuthenticated: () => {},
});

export const App = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <div>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Header />
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
};
