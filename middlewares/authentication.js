const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers // ambil token dr header
        // console.log(authorization);
        if (!authorization) {
            throw { name: "Unauthorized" }
        }

        const access_token = authorization.split(" ")[1] // split  kata2 "Bearer"
        // console.log(access_token, ',,,,,,,,,,,,ini token');
        const payload = verifyToken(access_token)
        // console.log(payload, '<<<<<<<<<<ini payload');

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        }) // cari user sesuai hasil decode 

        if (!user) {
            throw { name: "Unauthorized" }
        }
        // console.log(user);

        req.loginInfo = {
            userId: user.id,
            email: user.email,
        } //  bikin object baru di dalam request

        next()
    } catch (error) {
        console.log(error);
        next(error)

    }
}

module.exports = {authentication}