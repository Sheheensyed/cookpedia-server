// import
const express = require('express')
const recipeController = require('../controller/recipeController')
const testimonialController = require('../controller/testimonialController')
const userController=require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const { downloadRecipe } = require('../controller/downloadRecipeController')
const { saveRecipeController, getUserRecipeController, removeSavedRecipeController, getUserDownloadList } = require('../controller/saveRecipeController')
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

// save recipe
router.post('/recipe/:id/save',jwtMiddleware,saveRecipeController)

// get user saved recipe
router.get('/get-save-recipes',jwtMiddleware,getUserRecipeController)

// delete user saved recipe
router.delete('/save-recipes/:id/remove',jwtMiddleware,removeSavedRecipeController)

// get user download recipe
router.get("/user-downloads",jwtMiddleware,getUserDownloadList)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

// get all users
router.get("/all-users",jwtMiddleware,userController.getAllUsersController)

// get all download list
router.get("/download-list",jwtMiddleware,userController.getAllDownloadListController)

// get all Testimonial
router.get("/testimonials",jwtMiddleware,testimonialController.getAllTestimonialController)

// update testimonial
router.get('/feedback/:id/update',jwtMiddleware,testimonialController.updateTestimonialController)

// get approved feedback
router.get('/approved-feedback',testimonialController.getAllApprovedFeedbackController)

// add recipe
router.post('/add-recipe',jwtMiddleware,recipeController.addRecipeController)

// update recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)

// delete recipe
router.delete('/recipe/:id/delete',jwtMiddleware,recipeController.deleteRecipeController)

module.exports=router