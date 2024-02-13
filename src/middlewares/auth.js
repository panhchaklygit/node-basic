const jwt = require('jsonwebtoken');
const User = require('@models/mongo/user.model');
const { AppError } = require('./handle_error');

// check if user is authenticated
const isAuthenticated = async (req, res, next) => {

  const {token} = req.cookies;

  // make sure token exists
  if (!token) {
    return next (new AppError('You must log in to access this ressource', 401));
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();

  } catch (error) {
    return next (new AppError('You must log in to access this ressource', 401));
  }
};

// admin middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 0) {

    return next (new AppError('Access denied, you must be an admin', 401));
  }
  next();

};

// branch middleware
const isBranch = (req, res, next) => {
  if (req.user.role !== 1) {

    return next (new AppError('Access denied, you must be an branch', 401));
  }
  next();

};

module.exports = {isAuthenticated, isAdmin, isBranch};