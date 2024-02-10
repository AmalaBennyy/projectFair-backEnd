//set path to resolve request

//1)import express module
const express = require('express')

//import controller
const userController =require('../controllers/userController')

//import project controller

const projectController = require('../controllers/projectController')

//import jwtmiddleware
const jwtMiddleware =require('../Middleware/jwtMiddleware')
//2)create an object for router class inside express module
const router =new express.Router()

//3)setup path to resolve request
//syntax - roter.httprequest('path to resolve',()=>{how to resolve})

//import multer

const multiconfig=require('../Middleware/multerMiddleware')

//a)register
router.post('/user/register',userController.register)

//b)login
router.post('/user/login',userController.login)

//c)add project
router.post('/projects/add',jwtMiddleware,multiconfig.single('image'), projectController.addproject)

//d)home project
router.get('/project/home-project',projectController.gethomeproject)

//e)allproject
router.get('/project/all-project',jwtMiddleware,projectController.getallproject)

//f)userproject
router.get('/user/all-project',jwtMiddleware,projectController.getuserproject)

//g)edit project

router.put('/project/edit/:id',jwtMiddleware,multiconfig.single('projectImage'),projectController.editProject)

//h)delete project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteProject)

//edit profile
router.put('/user/edit',jwtMiddleware,multiconfig.single('profile'),userController.editUser)

//4)export router
module.exports = router

