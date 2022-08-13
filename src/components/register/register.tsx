import { Formik } from 'formik';
import styles from './register.module.scss';
import { validateLogin } from '../../utils/formsValidations';
import { Button } from '../ui/button';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ReturnIcon } from '../../assets/svg/returnIcon.svg';
import { register } from '../../api/recipesApi';
import { UserForm } from '../ui/userForm';

export const Register = () => {
  const [submitError, setSubmitError] = useState('');

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <NavLink className={styles.returnLink} to={'/recipes'}>
        <Button>
          <ReturnIcon />
        </Button>
      </NavLink>
      <h1 className={styles.title}>Register</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          register(values.email, values.password).then(
            (response) => {
              console.log(response);
              setSubmitting(false);
              navigate('/recipes');
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
    </div>
  );
};
