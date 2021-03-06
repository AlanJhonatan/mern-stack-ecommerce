import React, { useState, useEffect } from 'react';

import Card from './Card';
import Layout from './Layout';
import Search from './Search';

import { getProducts } from './apiCore';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      }

      setProductsBySell(data);
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      }

      setProductsByArrival(data);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home Page'
      description='Node React E-commerce App'
      className='container-fluid'
    >
      <Search />
      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
        {productsByArrival.map((product, idx) => (
          <div key={idx} className='col-4 mb-3'>
            <Card key={idx} product={product} />
          </div>
        ))}
      </div>
      <hr />
      <h2 className='mb-4'>Last Arrivals</h2>
      <div className='row'>
        {productsBySell.map((product, idx) => (
          <div key={idx} className='col-4 mb-3'>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
