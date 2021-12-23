import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;