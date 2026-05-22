const express = require('express')
const { getUser, registerUser, loginUser, updateUser, deleteUser, forgetPassword, verifyOTP, resetPassword } = require('../controller/user.controller')
const protect = require('../middleware/protect')
const adminOnly = require('../middleware/adminOnly.middleware')
const userRouter = express.Router()

//PUBLIC ROUTER :
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

//PROTECTED ROUTER :
userRouter.get('/me',protect,getUser)
userRouter.put('/update',protect,updateUser)
userRouter.delete('/delete/:id',protect,adminOnly,deleteUser)
userRouter.post('/forget-password',forgetPassword)
userRouter.post('/verify-OTP',verifyOTP)
userRouter.post('/reset-password',resetPassword)

module.exports = userRouter