// import recipe
const recipes = require('../model/recipeModel')

exports.getAllRecipeController = async (req, res) => {
    console.log(`Inside getAllRecipeController`);

    try {
        const allRecipe = await recipes.find()
        res.status(200).json(allRecipe)
    } catch (err) {
        res.status(401).json(err)
    }

}

// get a single recipe
exports.getSingleRecipeController = async (req, res) => {
    console.log('Inside get Single Recipe Controller');

    const { id } = req.params

    try {
        const recipeDetails = await recipes.findById({ _id: id })
        res.status(202).json(recipeDetails)

    } catch (error) {
        res.status(407).json({ message: error })
    }

}

exports.relatedRecipeController = async (req,res) => {
    console.log(`Inside recipe controller`);

    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(allRelatedRecipes)
    } catch (error) {
        res.status(403).json({ message: error.message })
    }

}