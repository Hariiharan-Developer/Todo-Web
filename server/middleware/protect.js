const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect =asyncHandler(async(req,res,next)=>{
    let token;
    let header = req.headers.authorization

    if(header && header.startsWith('Bearer')){

        try{

        //Get Token
        token = header.split(' ')[1]

        //Verify token
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        console.log('decoded :', decoded)

        //Get User 
        req.user = await User.findById(decoded.id).select('-password')
        console.log(`req.user : ${req.user}`.green.bold)

        next()

        }catch(err){
            res.status(401)
            throw new Error('not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('No token passed')
    }
})

module.exports = protect