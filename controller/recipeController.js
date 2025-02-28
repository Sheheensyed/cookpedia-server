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

// get related recipe
exports.relatedRecipeController = async (req, res) => {
    console.log(`Inside recipe controller`);

    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(allRelatedRecipes)
    } catch (error) {
        res.status(403).json({ message: error.message })
    }

}

// add recipe
exports.addRecipeController = async (req, res) => {
    console.log(`Inside addRecipeController`);

    // 1. get all data from req.body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, caloriesPerServing, image, cuisine, mealType } = req.body;
    console.log(req.body);


    try {
        // 2. check recipealready in model
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            // 3. already exist
            res.status(404).json(`Recipe already in the collection. Please add another one`)
        } else {
            // 4. recipe not found in model. then add the recipe
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, caloriesPerServing, image, cuisine, mealType
            })
            await newRecipe.save()
            res.status(202).json(newRecipe)
        }

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

// edit recipe
exports.editRecipeController = async (req, res) => {
    console.log(`Inside edit Recipe Controller`);

    const { id } = req.params

    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, caloriesPerServing, image, cuisine, mealType } = req.body;
    console.log(req.body);

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({ _id: id }, {
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, caloriesPerServing, image, cuisine, mealType
        }, { new: true })
        await updatedRecipe.save()
        res.status(202).json(updatedRecipe)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.deleteRecipeController=async(req,res)=>{
    console.log(`Inside delete Recipe Controller`);
    
    const {id}=req.params

    try {
        const removeRecipe =await recipes.findByIdAndDelete({_id:id})
        res.status(202).json(removeRecipe)
    } catch (error) {
        res.status(202).json({message:error.message})
    }

}