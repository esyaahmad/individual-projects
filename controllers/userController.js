const { User } = require('../models/index')



class userController {

    static async register(req,res,next) {
        try {
            const {email, password, phoneNumber, address} = req.body

            const user = await User.create({email, password, phoneNumber, address})
        
            res.status(201).json({role: user.role, email: user.email, phoneNumber: user.phoneNumber, address: user.address})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = userController