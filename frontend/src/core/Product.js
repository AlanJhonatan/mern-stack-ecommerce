import React, { useState, useEffect } from 'react';
import Layout from './Layout';

import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
        return;
      }

      setProduct(data);
      listRelated(data._id).then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }

        setRelatedProduct(data);
      });
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;

    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product &&
        product.description &&
        product.description.substring(0, 100) + '...'
      }
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-8'>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className='col-4'>
          <h4>Related Products</h4>
          {relatedProduct.map((product, idx) => (
            <div key={idx} className='mb-3'>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
