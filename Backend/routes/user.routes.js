const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email Id'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters long'),
  ],
  userController.registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password incorrect.'),
  ],
  userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
