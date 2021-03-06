import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import ShowImage from './ShowImage';

import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary mb-2 mr-2'>
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showCartButton = (showAddToCartButton) =>
    showAddToCartButton && (
      <button className='btn btn-outline-warning mt-2 mb-2' onClick={addToCart}>
        Add to cart
      </button>
    );

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-warning badge-pill'>Out of stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);

    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showRemoveButton = (showRemoveProductButton) =>
    showRemoveProductButton && (
      <button
        className='btn btn-outline-danger mt-2 mb-2'
        onClick={() => {
          removeItem(product._id);
          setRun(!run);
        }}
      >
        Remove Product
      </button>
    );

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <p className='lead mt-2'>
          {product.description.substring(0, 100) + '...'}
        </p>
        <p className='black-10'>$ {product.price}</p>
        <p className='black-9'>
          Category: {product.category && product.category.name}
        </p>
        <p className='black-8'>
          Product added on {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}

        {showCartButton(showAddToCartButton)}
        {showCartUpdateOptions(cartUpdate)}
        {showRemoveButton(showRemoveProductButton)}
      </div>
    </div>
  );
};

export default Card;
