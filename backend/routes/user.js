const express = require('express');
const router = express.Router();

const { requireSigin, isAuth, isAdmin } = require('../controllers/auth');
const { read, update, userById } = require('../controllers/user');

router.get('/secret/:userId', requireSigin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.get('/user/:userId', requireSigin, isAuth, isAdmin, read);
router.put('/user/:userId', requireSigin, isAuth, isAdmin, update);

router.param('userId', userById);

module.exports = router;
