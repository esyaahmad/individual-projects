const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index')
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors');
// const {uploader, cloudinaryConfig} = require ('./utils/cloudinaryConfig')


//bodyparser
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

// app.use(cloudinaryConfig)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = app
