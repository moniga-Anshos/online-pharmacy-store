
const express = require('express');
const userController = require('../Controller/userController');

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

userRouter.get('/profile/:user_id', userController.getProfile);
userRouter.put('/profile/:user_id', userController.updateProfile);

userRouter.post('/forgot-password', userController.forgotPassword);

module.exports = userRouter;

