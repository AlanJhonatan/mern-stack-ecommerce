const express = require('express');
const router = express.Router();

const { requireSigin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const {
  create,
  categoryById,
  read,
  list,
  update,
  remove,
} = require('../controllers/category');

router.get('/category/:categoryId', read);
router.get('/categories', list);
router.post('/category/create/:userId', requireSigin, isAuth, isAdmin, create);
router.put(
  '/category/:categoryId/:userId',
  requireSigin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSigin,
  isAuth,
  isAdmin,
  remove
);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
