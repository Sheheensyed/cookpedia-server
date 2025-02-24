const mongoose = require('mongoose')

const saveRecipeSchema = new mongoose.Schema({
    recipeId:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    image:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    },
})

const savedRecipe = mongoose.model('save-recipe', saveRecipeSchema)
module.exports = savedRecipe