const express = require('express');
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
  productById,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch,
} = require('../controllers/product');

const { requireSigin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/products', list);
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSigin, isAuth, isAdmin, create);
router.put(
  '/product/:productId/:userId',
  requireSigin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/product/:productId/:userId',
  requireSigin,
  isAuth,
  isAdmin,
  remove
);

router.get('/products/related/:productId', listRelated);
router.post('/products/by/search', listBySearch);
router.get('/products/search', listSearch);
router.get('/products/categories', listCategories);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
