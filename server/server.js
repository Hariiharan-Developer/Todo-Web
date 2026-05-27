const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const router = require('./router/todo.router')
const errorHandler = require('./middleware/error.middleware')
const userRouter = require('./router/user.router')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 4000
//Database CB :
connectDb()
app.use(cors())

//MIddleware :
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//API Endpoint's :
app.use('/api/v1',router)
app.use('/api/v1/user',userRouter)

//Unmatched API End point's :
app.use((req,res)=>{
    res.status(404).json({
        message : 'Invalid URL'
    })
})


//Error Middleware :
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.blue)
})
