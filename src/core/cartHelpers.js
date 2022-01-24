export const addItem = (item, next) => {
  let cart = [];

  if (typeof window === 'undefined') {
    console.log('Error: Window object is undefined');
    return;
  }

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  cart.push({
    ...item,
    count: 1,
  });

  // remove duplicates
  // build an array from new Set and turn it back into array using Array.from
  // later we can re-map it
  cart = Array.from(new Set(cart.map((product) => product._id))).map((id) =>
    cart.find((p) => p._id === id)
  );

  localStorage.setItem('cart', JSON.stringify(cart));
  next();
};

export const itemTotal = () => {
  if (typeof window === 'undefined') {
    console.log('Error: Window object is undefined');
    return;
  }

  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart')).length;
  }

  return 0;
};

export const getCart = () => {
  if (typeof window === 'undefined') {
    console.log('Error: Window object is undefined');
    return;
  }

  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart'));
  }

  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];

  if (typeof window === 'undefined') {
    console.error('Error: No window object');
    return cart;
  }

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  cart.map((product, idx) => {
    if (product._id === productId) {
      cart[idx].count = count;
    }
  });

  localStorage.setItem('cart', JSON.stringify(cart));
};
