const asyncHandler = require('express-async-handler')

//REGISTER USER:
const registerUser = asyncHandler(async(req,res)=>{
    res.json({message:'register method'})
})

//LOGIN USER :
const loginUser =asyncHandler(async(req,res)=>{
    res.json({message:'login method'})
})

//GET USER :
const getUser = asyncHandler(async(req,res)=>{
    res.json({message:'get method'})
})

module.exports ={
    registerUser,
    loginUser,
    getUser
}