import { Formik } from 'formik';
import styles from './login.module.scss';
import { validateLogin } from '../../utils/formsValidations';
import { Button } from '../ui/button';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ReturnIcon } from '../../assets/svg/returnIcon.svg';
import { auth } from '../../api/recipesApi';
import { UserForm } from '../ui/userForm';
import { AuthContext } from '../app';

export const Login = () => {
  const [submitError, setSubmitError] = useState('');
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <NavLink className={styles.returnLink} to={'/recipes'}>
        <Button>
          <ReturnIcon />
        </Button>
      </NavLink>
      <h1 className={styles.title}>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          auth(values.email, values.password).then(
            (response) => {
              setSubmitting(false);
              navigate('/recipes');
              localStorage.setItem('token', response.data.email);
              setAuthenticated(true);
            },
            (error) => {
              setSubmitError(error);
              setSubmitting(false);
            }
          );
        }}
        validate={validateLogin}>
        {({ isSubmitting }) => (
          <UserForm isSubmitting={isSubmitting} submitError={submitError} />
        )}
      </Formik>
      <NavLink className={styles.link} to={'/register'}>
        <span>Go to register</span>
      </NavLink>
    </div>
  );
};
