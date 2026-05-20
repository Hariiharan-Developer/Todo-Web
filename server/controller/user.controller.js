const asyncHandler = require('express-async-handler')
const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const genToken = require('../utils/jwt')

//REGISTER USER:
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('To register new user must have Name ,Email & Password ')
    }
    if(password.length < 8){
        res.status(400)
        throw new Error('Password must be 8 character')
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist please check the email address')
    }
    //BCRYPT :
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await User.create({
        name,
        email,
        password:hashedPassword
    })

    res.json({
        _id:newUser._id,
        name :newUser.name,
        email: newUser.email,
        token:genToken(newUser._id)
    })
})

//LOGIN USER :
const loginUser =asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('To Login must have valid email address & password')
    }
    const findUser = await User.findOne({email})
    if(!findUser){
        res.status(400)
        throw new Error('User not found , please register')
    }
    const compare = await bcrypt.compare(password,findUser.password)
    if(!compare){
        res.status(400)
        throw new Error('Invalid password')
    }
    res.json({
        _id: findUser.id,
        name:findUser.name,
        email:findUser.email,
        token:genToken(findUser._id)
    })
})

//GET USER :
const getUser = asyncHandler(async(req,res)=>{
    const user = await User.find()
    res.json(req.user)
})

// UPDATE USER DETAIL :
const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name,email,password} = req.body

    if(!id){
        res.status(400)
        throw new Error('Invalid credantial')
    }

    const userExist = await User.findById(id)
    if(!userExist){
        res.status(400)
        throw new Error('Invalid user')
    }

    const updateData = {
        name,
        email,        
    }

    if(password){
        if(password.length < 8){
            res.status(400)
            throw new Error('password should be strong')
        }
        //BCRYPT :
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        updateData.password = hashedPassword
    }

    const updateUser = await User.findByIdAndUpdate(id,
            updateData,
        {
            new:true,
            runValidators:true
        },
    )
    res.status(201).json({
        _id:updateUser.id,
        name:updateUser.name,
        email:updateUser.email
    })
})

//DELETE USER :
const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    if(!id){
        res.status(400)
        throw new Error('Invalid credantial')
    }
    const userExist = await User.findById(id)
    if(!userExist){
        res.status(400)
        throw new Error('User not found')
    }
    const removeUser = await User.findByIdAndDelete(id)
    res.status(200).json({message:'user deleted succesfully'})
})



module.exports ={
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}