const express = require('express')
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controller/user.controller')
const userRouter = express.Router()

userRouter.get('/user',getUser)
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/updateUser/:id',updateUser)
userRouter.delete('/deleteUser/:id',deleteUser)

module.exports = userRouter