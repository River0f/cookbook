import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteProductById, fetchProducts } from '../../api/productsApi';
import { Product } from '../interafces';
import { ProductsCreateForm } from '../productsCreateForm/productsCreateForm';
import { Button } from '../ui/button';
import styles from './products.module.scss';
import { ReactComponent as DeleteIcon } from './deleteIcon.svg';
import { Modal } from '../ui/modal';
import { ReactComponent as ReturnIcon } from '../../assets/svg/returnIcon.svg';

export const Products = () => {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const setProducts = () => {
    fetchProducts().then((products) => {
      setProductsList(products.products);
    });
  };
  const prepareDelete = (id: number) => {
    setIsDeleting(true);
    setIdToDelete(id);
  };
  const deleteProduct = () => {
    deleteProductById(idToDelete).then(() => {
      setProducts();
      setIsDeleting(false);
    });
  };
  const editProduct = (id: number) => {
    console.log(id);
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    setProducts();
  }, []);

  return (
    <div className="productsContainer">
      <NavLink className={styles.returnLink} to={'/recipes'}>
        <Button>
          <ReturnIcon />
        </Button>
      </NavLink>
      <div>
        <span className="title"> Lista produktów</span>
        <Modal visible={isDeleting}>
          <Button onClick={() => deleteProduct()}>Confirm</Button>
          <Button onClick={() => setIsDeleting(false)}>Discard</Button>
        </Modal>
        <div className={styles.productsContainer}>
          {productsList.map((product, index) => {
            return (
              <div key={product.id} className={styles.product}>
                {product.name}
                <Button onClick={() => prepareDelete(product.id)}>
                  <DeleteIcon />
                </Button>
                <Button onClick={() => editProduct(product.id)}>Edit</Button>
              </div>
            );
          })}
        </div>
      </div>
      <ProductsCreateForm setProducts={setProducts} />
    </div>
  );
};
