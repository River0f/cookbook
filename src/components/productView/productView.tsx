import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductsById, updateProducts } from '../../api/productsApi';
import { Product } from '../interafces';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export const ProductView = () => {
  const { id: idString } = useParams();
  const id = Number(idString);
  const [name, setName] = useState<Product[]>([]);

  const productDetails = (id: number) => {
    fetchProductsById(id).then((product) => {
      setName(product.name);
      console.log();
    });
  };
  useEffect(() => {
    productDetails(id);
  }, []);

  return (
    <div>
      <NavLink to={'/products'}>return</NavLink>
      <div>
        <div>{id}</div>
        <div>{name}</div>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const data: string = values.name;
            updateProducts(id, data).then(() => {
              productDetails(id);
            });
          }}>
          {({ isSubmitting }) => (
            <Form>
              <Field placeholder="name" type="text" name="name" />
              <ErrorMessage name="name" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
