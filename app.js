if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./routers/index')
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors');


//bodyparser
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)



module.exports = app
