const PRODUCTS_BASE_URL: string =
  'http://cookbook-docs.herokuapp.com/api/v1/products';

export const fetchProducts = async () => {
  const response = await fetch(`
      ${PRODUCTS_BASE_URL}`);

  return response.json();
};

export const postProducts = async (data: any) => {
  const response = await fetch(`${PRODUCTS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const deleteProductById = async (id: number) => {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
export const fetchProductsById = async (id: number) => {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`);
  return response.json();
};
export const updateProducts = async (id: number, newName: string) => {
  console.log('otrzymany nr: ', id, newName);
  const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ name: newName }),
  });
  await response.json();
};
