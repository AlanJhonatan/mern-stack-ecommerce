import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
        return;
      }

      setData({ ...data, categories: data });
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Search Bar</h2>
      {JSON.stringify(categories)}
    </div>
  );
};

export default Search;
