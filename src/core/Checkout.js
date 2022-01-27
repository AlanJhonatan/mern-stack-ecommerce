import React from 'react';
import { Link } from 'react-router-dom';

// import Card from './Card';
// import Search from './Search';

import { isAuthenticated } from '../auth';

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () =>
    isAuthenticated() ? (
      <button className='btn btn-success'>Checkout</button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
