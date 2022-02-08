const express = require('express');
const router = express.Router();

const { requireSigin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { create } = require('../controllers/order');

router.post('/order/create/:userId', requireSigin, isAuth, create);

router.param('userId', userById);

module.exports = router;
