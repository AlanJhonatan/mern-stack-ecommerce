import React, { useState, useEffect } from 'react';

const RadioBox = ({ prices }) => {
  const [value, setValue] = useState(0);

  const handleChange = () => {
    //
  };

  return prices.map((price, idx) => (
    <div key={idx}>
      <input
        type='radio'
        className='mr-2 ml-4'
        value={`${price.id}`}
        onChange={handleChange}
      />
      <label className='form-check-label'>{price.name}</label>
    </div>
  ));
};

export default RadioBox;
