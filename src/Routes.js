import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;