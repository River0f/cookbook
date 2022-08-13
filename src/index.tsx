import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Recipes } from './components/recipes/recipes';
import { RecipeView } from './components/recipeView/recipeView';
import { Login } from './components/login';
import { Register } from './components/register';
import { Products } from './components/products';
import { ProductView } from './components/productView';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="recipes" element={<Recipes />}></Route>
          <Route path="recipes/:id" element={<RecipeView />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="products/:id" element={<ProductView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
