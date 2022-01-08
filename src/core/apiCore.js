import { API } from '../config';

export const getProducts = (sortBy) => {
  let order = 'desc';
  let limit = 6;

  return fetch(
    `${API}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`,
    {
      method: 'GET',
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
