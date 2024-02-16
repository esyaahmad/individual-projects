const { Category } = require('../models/index')


class categoryController {
    static async addCategory(req,res,next) {
        try {
            // console.log(req.body);
            const { name } = req.body
            const category = await Category.create({ name })
            res.status(201).json(category)
        } catch (error) {
           next(error)
        }
    }

    static async getCategories(req,res,next) {
        try {
            const category = await Category.findAll()
            res.status(200).json({category})
        } catch (error) {
            console.log(error);
           next(error)
        }
    }



}

module.exports = categoryController