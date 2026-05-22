const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Name is required'],
        trim:true
    },
    email :{
        type:String,
        required:[true , 'email is required'],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true, 'password required'],
        minlenngth:[8 , 'password must be 8 character'],
        trim:true
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User