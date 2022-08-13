import { postProducts } from '../../api/productsApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface ProductsCreateFormProps {
  setProducts: Function;
}

export const ProductsCreateForm = ({
  setProducts,
}: ProductsCreateFormProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const data: any = {
            name: values.name,
          };
          postProducts(data).then(() => {
            setProducts();
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
  );
};
