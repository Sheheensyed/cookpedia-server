// import
const express = require('express')
const recipeController = require('../controller/recipeController')
const testimonialController = require('../controller/testimonialController')
const userController=require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const { downloadRecipe } = require('../controller/downloadRecipeController')
const router = new express.Router()

// all-recipe
router.get('/all-recipes',recipeController.getAllRecipeController)

// add-testimony
router.post("/",testimonialController.addTestimonialController)

// register
router.post('/register',userController.addUserController)

// login
router.post('/login',userController.loginUserController)

// get single recipe
router.get('/recipe/:id/view',jwtMiddleware,recipeController.getSingleRecipeController)

// get similar recipe
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipeController)

// get single recipe
router.post('/recipe/:id/download',jwtMiddleware,downloadRecipe)

module.exports=router