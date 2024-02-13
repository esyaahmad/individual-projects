const jwt = require('jsonwebtoken')
// require('dotenv').config()


const SECRET = 'esyaahmad'
const signToken = (payload) => jwt.sign(payload, SECRET)
const verifyToken = (token) => jwt.verify(token, SECRET)

module.exports = {signToken, verifyToken}