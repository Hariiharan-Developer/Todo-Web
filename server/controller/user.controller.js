const asyncHandler = require('express-async-handler')
const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const genToken = require('../utils/jwt')
const sendMail = require('../utils/nodemailer')

//REGISTER USER:
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,role} = req.body
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
        role,
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
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
})

// UPDATE USER DETAIL :
const updateUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error(' Not Authorized ')
    }

   
    if(name) user.name = name
    if(email) {
        const emailExist = await User.findOne({email})
        if(emailExist && emailExist._id.toString() !== req.user.id){
            res.status(400)
            throw new Error('Email already used please check')
        }
    }
    if(password){
        if(password.length < 8){
            res.status(400)
            throw new Error('password should be strong')
        }
        //BCRYPT :
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        user.password = hashedPassword
    }

    const updateUser = await user.save()

    res.status(201).json({
        _id:updateUser.id,
        name:updateUser.name,
        email:updateUser.email
    })
})

//DELETE USER :
const deleteUser = asyncHandler(async(req,res)=>{
    const{id} = req.params
    const user = await User.findById(id)
    if(!user){
        res.status(400)
        throw new Error('user not found')
    }
    
    const removeUser = await User.findByIdAndDelete(id)
    res.status(200).json({message:'user deleted succesfully'})
})

//FORGET PASSWORD :
const forgetPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('email id not valid')
    }

    // OTP GENERATION :
    const otp = Math.floor(100000+Math.random()*900000).toString()
    user.otp = otp
    user.otpExpires = Date.now() + 5*60*1000
    await user.save()

   await sendMail(
  email,
  "Password Reset OTP",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
    
    <div style="max-width:500px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      
      <div style="background:linear-gradient(to right,#7c3aed,#06b6d4); padding:20px; text-align:center; color:white;">
        <h1 style="margin:0;">Password Reset</h1>
      </div>

      <div style="padding:30px; color:#333;">
        <h2>Hello 👋</h2>

        <p>
          We received a request to reset your password.
          Use the OTP below to continue:
        </p>

        <div style="margin:30px 0; text-align:center;">
          <span style="
            display:inline-block;
            background:#111827;
            color:white;
            padding:15px 30px;
            font-size:28px;
            letter-spacing:5px;
            border-radius:8px;
            font-weight:bold;
          ">
            ${otp}
          </span>
        </div>

        <p>
          This OTP will expire in <b>5 minutes</b>.
        </p>

        <p style="color:#ef4444;">
          If you did not request a password reset, please ignore this email.
        </p>

        <hr style="margin:30px 0;" />

        <p style="font-size:14px; color:#6b7280; text-align:center;">
          © 2026 Your App Name. All rights reserved.
        </p>
      </div>
    </div>
  </div>
  `
);

    res.status(200).json({message:'OTP sent to email successfully',user})
})

//VERIFY OTP :
const verifyOTP = asyncHandler(async(req,res)=>{
    const {email,otp} = req.body

    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('Invalid email address')
    }

    if(user.otp !== otp){
        res.status(400)
        throw new Error('Invalid OTP')
    }

    if(user.otpExpires <Date.now()){
        res.status(400)
        throw new Error('OTP Expired')
    }

    res.status(200).json({message:'OTP verified successfully'})
})

const resetPassword = asyncHandler(async (req, res) => {

    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid email address');
    }

    if (!newPassword) {
        res.status(400);
        throw new Error('New password is required');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // clear OTP fields
    user.otp = null;
    user.otpExpires = null; // make sure this matches your model

    await user.save();

    res.status(200).json({
        message: 'Password reset successfully'
    });

});

module.exports ={
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    forgetPassword,
    verifyOTP,
    resetPassword
}