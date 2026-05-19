const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const app = express()

const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.blue)
})
