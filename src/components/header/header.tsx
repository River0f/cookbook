import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import { AuthContext } from '../app';
import { useContext } from 'react';

export const Header = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const onLogOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <header className={styles.header}>
      <span className={styles.logo}>CookBook</span>
      <nav className={styles.navBar}>
        <NavLink className={styles.link} to="recipes">
          Recipes
        </NavLink>
        <NavLink className={styles.link} to="products">
          Products
        </NavLink>
      </nav>
      <nav className={styles.login}>
        {!authenticated ? (
          <>
            <NavLink className={styles.link} to="login">
              Login
            </NavLink>
            <NavLink className={styles.link} to="register">
              Register
            </NavLink>
          </>
        ) : (
          <NavLink onClick={onLogOut} className={styles.link} to="/recipes">
            Login out
          </NavLink>
        )}
      </nav>
    </header>
  );
};
