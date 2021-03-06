import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Product from './core/Product';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import Cart from './core/Cart';

import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';

import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/shop' exact component={Shop} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
