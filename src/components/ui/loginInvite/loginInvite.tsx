import { NavLink } from 'react-router-dom';
import styles from './loginInvite.module.scss';

export const LoginInvite = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.message}>You need to login to post comments</h1>
      <NavLink to="/login" className={styles.link}>
        go to login
      </NavLink>
    </div>
  );
};
