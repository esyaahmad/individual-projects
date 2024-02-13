const { User } = require('../models/index')
const {compare} = require('../helpers/toBcrypt')
const {signToken} = require('../helpers/jwt')


class userController {

    static async register(req,res,next) {
        try {
            const {email, password} = req.body

            const user = await User.create({email, password})
        
            res.status(201).json({email: user.email, })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req,res,next) {
        try {
            const {email, password} = req.body

            if (!email) {
                throw {name : 'EmailIsRequired'}
            }
            if (!password) {
                throw {name : 'PasswordIsRequired' }
            }

            const user = await User.findOne({where : { email }})
            if (!user) {
                throw {name : 'NotFound' }
            }

            const isPasswordMatch = compare(password, user.password)
            
            if (!isPasswordMatch) {
                throw {name : 'InvalidEmailPassword' }
            }

            const payload = { // data2 yang mau kita simpan
                id: user.id,
                email: user.email,
            }

            // console.log(payload);
            const access_token = signToken(payload)
            // res.status(200).json({message : 'success login'})
            res.status(200).json({access_token : access_token})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = userController