const router = require('express').Router()
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
const projectController = require('../controllers/projectController')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const upload = require('../utils/multer')
const middlewareUpload = upload.single("file");




//users endpoint
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/google-login', userController.googleLogin)
router.use(authentication)


//project endpoint
router.get('/projects', projectController.getProjects)
router.get('/projects/:id', projectController.getProjectsById)
router.get('/projects-user', projectController.getProjectsByUserId)

router.post('/projects', projectController.addProject)
router.put('/projects/:id', authorization,projectController.editProjectById)
router.delete('/projects/:id', authorization, projectController.deleteProject)
router.patch('/projects/:id', authorization, middlewareUpload, projectController.patchProject)


//category endpoint
router.post('/categories', categoryController.addCategory)
router.get('/categories', categoryController.getCategories)
// router.put('/categories/:id',authorization, categoryController.editCategoryById)

module.exports= router
