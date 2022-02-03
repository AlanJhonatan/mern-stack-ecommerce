const express = require('express');
const router = express.Router();

const { requireSigin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { generateToken } = require('../controllers/braintree');

router.get('/braintree/getToken/:userId', requireSigin, isAuth, generateToken);

router.param('userId', userById);

module.exports = router;
