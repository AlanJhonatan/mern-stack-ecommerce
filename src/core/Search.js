import React, { useState, useEffect } from 'react';
import Card from './Card';

import { getCategories, list } from './apiCore';

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

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    if (!search) {
      return;
    }

    list({ search: search || undefined, category: category }).then(
      (response) => {
        if (response.error) {
          console.log(response.error);
          return;
        }

        setData({ ...data, results: response, searched: true });
      }
    );
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchedProducts = (results = []) => {
    return (
      <div className='row'>
        {results.map((product, idx) => (
          <Card key={idx} product={product} />
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn mr-2' onChange={handleChange('category')}>
              <option value='All'>Pick Category</option>
              {categories.map((c, idx) => (
                <option key={idx} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type='search'
            className='form-control'
            onChange={handleChange('search')}
            placeholder='Search by name'
          />
        </div>
        <div className='btn input-group-append' style={{ border: 'none' }}>
          <button className='input-group-text' onClick={searchSubmit}>
            Search
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>
        {searched && <h3>Search Results:</h3>}
        {searchedProducts(results)}
      </div>
    </div>
  );
};

export default Search;
