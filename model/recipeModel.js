// import mongoose
const mongoose = require('mongoose')

const recipeSchema= new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    ingredients:{
        require:true,
        type:Array
    },
    instructions:{
        require:true,
        type:Array
    },
    prepTimeMinutes:{
        require:true,
        type:Number
    },
    cookTimeMinutes:{
        require:true,
        type:Number
    },
    servings:{
        require:true,
        type:Number
    },
    difficulty:{
        require:true,
        type:String
    },
    caloriesPerServing:{
        require:true,
        type:Number
    },
    image:{
        require:true,
        type:String
    },
    cuisine:{
        require:true,
        type:String
    },
    mealtype:{
        require:true,
        type:Array
    },
})

const recipes = mongoose.model('recipes',recipeSchema)

module.exports=recipes