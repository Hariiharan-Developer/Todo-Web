const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const router = require('./router/todo.router')
const errorHandler = require('./middleware/error.middleware')
const app = express()

const port = process.env.PORT || 4000

//MIddleware :
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//API Endpoint's :
app.use('/api/v1',router)

//Database CB :
connectDb()

//Error Middleware :
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.blue)
})
