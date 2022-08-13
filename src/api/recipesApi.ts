const RECIPES_BASE_URL: string =
  'http://cookbook-docs.herokuapp.com/api/v1/recipes';
export const fetchRecipes = async (
  currentPage: number,
  pageSize: number,
  sortBy: string,
  sortOrder: string
) => {
  const response = await fetch(`
        ${RECIPES_BASE_URL}?page=${currentPage}&per_page=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`);

  return response.json();
};
export const fetchRecipesById = async (id: number) => {
  const response = await fetch(`${RECIPES_BASE_URL}/${id}`);
  return response.json();
};

export const deleteRecipeById = async (id: number) => {
  const response = await fetch(`${RECIPES_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const postRecipe = async (data: any) => {
  const response = await fetch(`${RECIPES_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const putRecipeById = async (id: number, data: any) => {
  const response = await fetch(`${RECIPES_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const postComment = async (id: number, data: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${RECIPES_BASE_URL}/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      credentials: 'include',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const auth = async (email: string, password: string) => {
  const response = await fetch(
    `http://cookbook-docs.herokuapp.com/api/v1/auth/sign_in`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    const error = `Email or password was incorrect`;
    console.log(response);
    return Promise.reject(error);
  }

  return response.json();
};

export const register = async (email: string, password: string) => {
  console.log(email);
  console.log(password);
  const response = await fetch(
    `http://cookbook-docs.herokuapp.com/api/v1/auth/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  if (!response.ok) {
    const error = `Error: Failed to register`;
    console.log(response);
    return Promise.reject(error);
  }

  return response.json();
};
