const { Project , User, Category} = require('../models/index')


class projectController {

    static async getProjects(req,res,next) {
        try {
            const project = await Project.findAll({
                include: {
                    model: User,
                    attributes: {exclude: ["password"]} 
                }
            })
            res.status(200).json({project})
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async getProjectsById(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static async addProject(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static async editProjectById(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteProject(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static async patchProject(req,res,next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = projectController