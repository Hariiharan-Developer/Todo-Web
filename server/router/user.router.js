const express = require('express')
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controller/user.controller')
const protect = require('../middleware/protect')
const userRouter = express.Router()

//PUBLIC ROUTER :
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

//PROTECTED ROUTER :
userRouter.get('/user',protect,getUser)
userRouter.put('/updateUser/protect',updateUser)
userRouter.delete('/deleteUser/protect',deleteUser)

module.exports = userRouter