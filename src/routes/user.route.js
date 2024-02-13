const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, singleUser } = require('@controllers/user.controller');
const { isAuthenticated } = require('@middlewares/auth');

// init routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/getme', isAuthenticated,  userProfile);
router.get('/:id', singleUser);
module.exports = router;