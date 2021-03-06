import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DropIn from 'braintree-web-drop-in-react';

import { isAuthenticated } from '../auth';

import { emptyCart } from './cartHelpers';
import {
  createOrder,
  getBraintreeClientToken,
  processPayment,
} from './apiCore';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
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

      setData({ clientToken: data.clientToken });
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

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to Checkout</button>
      </Link>
    );
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken && products.length ? (
        <div>
          <div className='form-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
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
    setData({ loading: true });
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
        // console.log(
        //   'send nonce and total to process:',
        //   nonce,
        //   getTotal(products)
        // );

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);

            const createOrderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              address: data.address,
            };

            createOrder(userId, token, createOrderData)
              .then((data) => console.log(data))
              .catch((err) => console.log(err));

            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run);
              console.log('payment success, empty cart');
              setData({ loading: false });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
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

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks ! Your payment was successfull ! :)
    </div>
  );

  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
