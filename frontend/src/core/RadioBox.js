import React, { useState } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((price, idx) => (
    <div key={idx}>
      <input
        type='radio'
        className='mr-2 ml-4'
        name={price}
        value={`${price._id}`}
        onChange={handleChange}
      />
      <label className='form-check-label'>{price.name}</label>
    </div>
  ));
};

export default RadioBox;
