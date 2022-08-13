export interface Comment {
  author: string;
  body: string;
}

export interface RecipeById {
  id: number;
  name: string;
  content: string;
  level: number;
  video_link: string;
  cooking_time: number;
  price: number | string;
  photo_url: string;
  avg_rate: number;
  rates_count: number;
  thumbnail_url: string;
  comments: Comment[];
  ingredients: Array<string>;
}

export interface Recipe {
  id: number;
  name: string;
  content: string;
  thumbnail_url: string | null;
  cooking_time: number;
  rates_count: number;
}

export interface Product {
  id: number;
  name: string;
}

export interface ProductList {
  id: number;
  name: string;
  productsList: Product[];
  setProductsList: Function;
}

export interface ProductById {
  id: number;
  name: string;
}
