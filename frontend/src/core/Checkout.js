import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DropIn from 'braintree-web-drop-in-react';

import { isAuthenticated } from '../auth';
import { getBraintreeClientToken } from './apiCore';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
        return;
      }

      setData({ ...data, clientToken: data.clientToken });
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () =>
    isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    );

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken && products.length ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />

          <button onClick={buy} className='btn btn-success'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const buy = () => {
    // send the nonce to your server
    // nonce is => data.instance.requrestPaymentMethod()
    let nonce;

    if (!data.instance) {
      console.log('instance doesnt exists');
      return;
    }

    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;

        //once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        console.log(
          'send nonce and total to process:',
          nonce,
          getTotal(products)
        );
      })
      .catch((error) => {
        console.log('dropin error:', error);
        setData({ ...data, error: error.message });
      });
  };

  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
