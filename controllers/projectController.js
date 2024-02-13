const { Project , User, Category} = require('../models/index')
const {uploader, handleUpload} =require ('../utils/cloudinaryConfig')

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
            const id = req.params.id
            const project = await Project.findByPk(id)
            if(!project) {
                throw {name: 'NotFound'}
            }
            res.status(200).json(project)
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async addProject(req,res,next) {
        try {
             // console.log(req.body);
            const { userId } = req.loginInfo
             const { title, description, categoryId, imageUrl} = req.body
             const project = await Project.create({ title, description, imageUrl, categoryId, userId })
             res.status(201).json(project)
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async editProjectById(req,res,next) {
        try {
            const id = req.params.id
            const projectFind = await Project.findByPk(id)
            if(!projectFind) {
                throw {name : 'NotFound'}
            }

            const { title, description, categoryId, imageUrl } = req.body
            const project = await projectFind.update({ title, description, categoryId, imageUrl })
            // const projectFindUpdate = await project.findByPk(id)
            res.status(200).json(project) 
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteProject(req,res,next) {
        try {
            const id = req.params.id
            const projectFind = await Project.findByPk(id)
            if(!projectFind) {
                throw {name : 'NotFound'}
            }
            await Project.destroy({where : {id:id}})
            res.status(200).json({message: `${projectFind.title} success to delete`}) 
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async patchProject(req,res,next) {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);
            
            // console.log(req.file);
            if(!req.file) {
                throw {name : 'InvalidDataType'}
            }
            const imageInBase64 = req.file.buffer.toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + imageInBase64;
            const result= await handleUpload(dataURI)
            // const image = result.url;
            console.log(result);
            if (!project) {
                throw {name : 'NotFound'}
            } else {
                // console.log(req.body);
                const { imageUrl } = req.body;
                await project.update({ imageUrl : result.url});
                res.status(200).json({ message: `Image ${project.title} success to update`, imageUrl : result.url });
            }

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = projectController